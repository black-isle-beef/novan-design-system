import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsCookieBannerComponent } from './cookie-banner.component';

@Component({
  imports: [DsCookieBannerComponent],
  template: `
    <button type="button" id="settings" (click)="open.set(true)">Cookie settings</button>
    <ds-cookie-banner
      [(open)]="open"
      [autoFocus]="false"
      acceptLabel="Accept all"
      declineLabel="Reject all"
      manageLabel="Manage preferences"
      [equalProminence]="true"
      (manage)="managed = managed + 1"
    >
      Read our <a href="/cookies">cookie policy</a>.
    </ds-cookie-banner>
  `,
})
class HostComponent {
  readonly open = signal(true);
  managed = 0;
}

describe('DsCookieBannerComponent', () => {
  it('is visible by default and exposes a dialog role', async () => {
    await TestBed.configureTestingModule({ imports: [DsCookieBannerComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsCookieBannerComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('emits `accepted` and hides the banner when the accept button is clicked', async () => {
    await TestBed.configureTestingModule({ imports: [DsCookieBannerComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsCookieBannerComponent);
    fixture.detectChanges();

    let acceptedEmitted = false;
    fixture.componentInstance.accepted.subscribe(() => (acceptedEmitted = true));

    const acceptButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-primary');
    acceptButton.click();
    fixture.detectChanges();

    expect(acceptedEmitted).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeFalsy();
  });

  it('keeps the default labels and the outlined decline action', async () => {
    await TestBed.configureTestingModule({ imports: [DsCookieBannerComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsCookieBannerComponent);
    fixture.detectChanges();

    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
    expect(buttons.map((b) => b.textContent?.trim())).toEqual(['Decline', 'Accept']);
    expect(buttons[0].classList).toContain('btn-outline-light');
  });

  it('renders nothing while `open` is false', async () => {
    await TestBed.configureTestingModule({ imports: [DsCookieBannerComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsCookieBannerComponent);
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeFalsy();
  });

  describe('with labels, a manage action and a two-way open binding', () => {
    async function render() {
      await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
      const fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      return fixture;
    }

    it('projects its message and gives accept and reject equal weight', async () => {
      const fixture = await render();
      const host: HTMLElement = fixture.nativeElement;

      expect(host.querySelector('#ds-cookie-banner-message a')?.getAttribute('href')).toBe('/cookies');
      const buttons = Array.from(host.querySelectorAll<HTMLButtonElement>('.ds-cookie-banner__actions button'));
      expect(buttons.map((b) => b.textContent?.trim())).toEqual(['Manage preferences', 'Reject all', 'Accept all']);
      expect(buttons[1].classList).toContain('btn-primary');
      expect(buttons[2].classList).toContain('btn-primary');
    });

    it('leaves focus alone on first render when autoFocus is off', async () => {
      const fixture = await render();
      const host: HTMLElement = fixture.nativeElement;

      expect(host.querySelector('.ds-cookie-banner')?.contains(document.activeElement)).toBe(false);
    });

    it('emits `manage` and stays open', async () => {
      const fixture = await render();
      const host: HTMLElement = fixture.nativeElement;

      host.querySelector<HTMLButtonElement>('.ds-cookie-banner__actions button')!.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.managed).toBe(1);
      expect(host.querySelector('[role="dialog"]')).toBeTruthy();
    });

    it('reopens with focus on the accept action, then returns focus to the opener', async () => {
      const fixture = await render();
      const host: HTMLElement = fixture.nativeElement;

      Array.from(host.querySelectorAll<HTMLButtonElement>('.ds-cookie-banner__actions button'))[1].click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.open()).toBe(false);
      expect(host.querySelector('[role="dialog"]')).toBeFalsy();

      const settings = host.querySelector<HTMLButtonElement>('#settings')!;
      settings.focus();
      settings.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const accept = Array.from(host.querySelectorAll<HTMLButtonElement>('.ds-cookie-banner__actions button'))[2];
      expect(document.activeElement).toBe(accept);

      accept.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(document.activeElement).toBe(settings);
    });
  });
});
