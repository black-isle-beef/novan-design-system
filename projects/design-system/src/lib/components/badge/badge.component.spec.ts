import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsBadgeComponent, type DsBadgeVariant } from './badge.component';

@Component({
  standalone: true,
  imports: [DsBadgeComponent],
  template: `<ds-badge [variant]="variant" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">{{ label }}</ds-badge>`,
})
class HostComponent {
  variant: DsBadgeVariant = 'neutral';
  dismissible = false;
  closeButtonLabel = 'Remove';
  label = 'Draft';
}

@Component({
  standalone: true,
  imports: [DsBadgeComponent],
  template: `<ds-badge dismissible>Draft</ds-badge>`,
})
class BareAttributeHostComponent {}

describe('DsBadgeComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the projected label and defaults to the neutral variant', async () => {
    const fixture = await createFixture();
    const badge = fixture.nativeElement.querySelector('ds-badge');

    expect(badge.textContent).toContain('Draft');
    expect(badge.classList.contains('ds-badge--neutral')).toBe(true);
  });

  it('reflects the variant input as a host class', async () => {
    const fixture = await createFixture();
    fixture.componentInstance.variant = 'danger';
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('ds-badge');
    expect(badge.classList.contains('ds-badge--danger')).toBe(true);
    expect(badge.classList.contains('ds-badge--neutral')).toBe(false);
  });

  it('omits the close button by default', async () => {
    const fixture = await createFixture();
    expect(fixture.nativeElement.querySelector('.ds-badge__close')).toBeNull();
  });

  it('renders a labeled close button when dismissible', async () => {
    const fixture = await createFixture();
    fixture.componentInstance.dismissible = true;
    fixture.componentInstance.closeButtonLabel = 'Remove Draft filter';
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.ds-badge__close');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('aria-label')).toBe('Remove Draft filter');
  });

  it('treats a bare `dismissible` attribute (no property binding) as true', async () => {
    await TestBed.configureTestingModule({ imports: [BareAttributeHostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(BareAttributeHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ds-badge__close')).toBeTruthy();
  });

  it('emits dismissed when the close button is clicked, without removing itself', async () => {
    const fixture = await createFixture();
    fixture.componentInstance.dismissible = true;
    fixture.detectChanges();

    const badgeDebugEl = fixture.debugElement.children.find((child) => child.name === 'ds-badge');
    const badgeInstance = badgeDebugEl?.componentInstance as DsBadgeComponent;
    let dismissedCount = 0;
    badgeInstance.dismissed.subscribe(() => dismissedCount++);

    (fixture.nativeElement.querySelector('.ds-badge__close') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(dismissedCount).toBe(1);
    expect(fixture.nativeElement.querySelector('ds-badge')).toBeTruthy();
  });
});
