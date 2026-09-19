import { TestBed } from '@angular/core/testing';
import { DsFlipCardComponent } from './flip-card.component';

describe('DsFlipCardComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsFlipCardComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsFlipCardComponent);
    fixture.componentRef.setInput('heading', 'Deep sky imaging');
    return fixture;
  }

  function getButton(fixture: { nativeElement: HTMLElement }): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  }

  it('renders the heading on the front face', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ds-flip-card__heading')?.textContent).toContain(
      'Deep sky imaging',
    );
  });

  it('starts unflipped, with the front face visible to assistive tech and the back hidden', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const button = getButton(fixture);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('.ds-flip-card__face--front')?.getAttribute('aria-hidden')).toBe(
      'false',
    );
    expect(fixture.nativeElement.querySelector('.ds-flip-card__face--back')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('toggles flipped state, aria-expanded, and per-face aria-hidden on click (covers Enter/Space too, since both fire a native button click)', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const button = getButton(fixture);
    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.classList.contains('ds-flip-card--flipped')).toBe(true);
    expect(fixture.nativeElement.querySelector('.ds-flip-card__face--front')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
    expect(fixture.nativeElement.querySelector('.ds-flip-card__face--back')?.getAttribute('aria-hidden')).toBe(
      'false',
    );

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.classList.contains('ds-flip-card--flipped')).toBe(false);
  });

  it('defaults to a dark media tone (white heading) and omits the light-media class', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('ds-flip-card--light-media')).toBe(false);
  });

  it('adds the light-media class when mediaTone is "light"', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('mediaTone', 'light');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('ds-flip-card--light-media')).toBe(true);
  });
});
