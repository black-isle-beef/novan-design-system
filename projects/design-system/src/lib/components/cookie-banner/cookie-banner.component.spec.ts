import { TestBed } from '@angular/core/testing';
import { DsCookieBannerComponent } from './cookie-banner.component';

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
});
