import { TestBed } from '@angular/core/testing';
import { DsLogoFoundationComponent } from './logo-foundation.component';

describe('DsLogoFoundationComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [DsLogoFoundationComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsLogoFoundationComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders every primary and compact lockup as a card', async () => {
    const fixture = await setup();
    const primaryCards = fixture.nativeElement.querySelectorAll('#primary-lockup .ds-lg__logo-card');
    const compactCards = fixture.nativeElement.querySelectorAll('#compact-lockup .ds-lg__logo-card');
    expect(primaryCards.length).toBe(5);
    expect(compactCards.length).toBe(4);
  });

  it('defaults the responsive header preview to the primary lockup on desktop', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;
    expect(component.viewportId()).toBe('desktop');
    expect(component.headerLogo().id).toBe('primary-white-1');
  });

  it('swaps the header preview logo when the viewport toggle changes', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    component.setViewport('mobile');
    fixture.detectChanges();

    expect(component.headerLogo().id).toBe('compact-white');
    const img = fixture.nativeElement.querySelector('.ds-lg__wire-header-logo') as HTMLImageElement;
    expect(img.src).toContain('/logos/compact-lockup/compact-lockup-on-white.png');
  });

  it('copies the selected web-lockup HTML snippet to the clipboard', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    await component.copyCode(component.selectedSnippet().html, 'mark-charcoal-html');

    expect(writeText).toHaveBeenCalledWith(component.selectedSnippet().html);
    expect(component.copiedKey()).toBe('mark-charcoal-html');
  });
});
