import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the structural page regions', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[role="banner"]')).toBeTruthy();
    expect(compiled.querySelector('ds-breadcrumb')).toBeTruthy();
    expect(compiled.querySelector('[role="contentinfo"]')).toBeTruthy();
  });

  it('toggles the data-bs-theme attribute on the document element', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    document.documentElement.removeAttribute('data-bs-theme');

    const toggle = fixture.nativeElement.querySelector('.ds-sandbox__theme-toggle') as HTMLButtonElement;
    toggle.click();
    await fixture.whenStable();

    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');

    toggle.click();
    await fixture.whenStable();

    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });
});
