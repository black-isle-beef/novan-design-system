import { TestBed } from '@angular/core/testing';
import { DsBrandDarkModeFoundationComponent } from './dark-mode-foundation.component';

describe('DsBrandDarkModeFoundationComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [DsBrandDarkModeFoundationComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsBrandDarkModeFoundationComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('does not set data-bs-theme by default', async () => {
    const fixture = await setup();
    expect(fixture.nativeElement.getAttribute('data-bs-theme')).toBeNull();
  });

  it('sets data-bs-theme="dark" on the host when toggled', async () => {
    const fixture = await setup();
    fixture.componentInstance.toggleDarkMode();
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  it('renders a swatch pair for every published color token', async () => {
    const fixture = await setup();
    const cards = fixture.nativeElement.querySelectorAll('.ds-bfd__token-card');
    expect(cards.length).toBe(fixture.componentInstance.swatches.length);
  });
});
