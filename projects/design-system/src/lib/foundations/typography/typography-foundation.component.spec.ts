import { TestBed } from '@angular/core/testing';
import { DsTypographyFoundationComponent } from './typography-foundation.component';

describe('DsTypographyFoundationComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [DsTypographyFoundationComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsTypographyFoundationComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders all six heading levels in the type scale', async () => {
    const fixture = await setup();
    const rows = fixture.nativeElement.querySelectorAll('.ds-tf__heading-row');
    expect(rows.length).toBe(6);
    expect(fixture.nativeElement.querySelector('.ds-tf__heading-row h1')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.ds-tf__heading-row h6')).toBeTruthy();
  });

  it('renders all nine weights in the weight grid', async () => {
    const fixture = await setup();
    const rows = fixture.nativeElement.querySelectorAll('.ds-tf__weight-row');
    expect(rows.length).toBe(9);
  });

  it('renders hyperlink examples for body, navigation, and standalone links', async () => {
    const fixture = await setup();
    const section = fixture.nativeElement.querySelector('#hyperlinks') as HTMLElement;

    expect(section.querySelector('.ds-tf__link--body')).toBeTruthy();
    expect(section.querySelectorAll('.ds-tf__example-link-list a').length).toBe(2);
    expect(section.querySelector('.ds-tf__link-row a')).toBeTruthy();
  });

  it('toggles dark mode', async () => {
    const fixture = await setup();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.classList.contains('ds-tf--dark')).toBe(false);

    fixture.componentInstance.toggleDarkMode();
    fixture.detectChanges();

    expect(host.classList.contains('ds-tf--dark')).toBe(true);
  });

  it('updates the playground preview style from control input', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    component.onPlaygroundSizeChange({ target: { value: '48' } } as unknown as Event);
    component.onPlaygroundWeightChange({ target: { value: '700' } } as unknown as Event);
    fixture.detectChanges();

    const preview = fixture.nativeElement.querySelector('.ds-tf__playground-preview') as HTMLElement;
    expect(preview.style.fontSize).toBe('48px');
    expect(preview.style.fontWeight).toBe('700');
  });
});
