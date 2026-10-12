import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { DsHeaderComponent } from './header.component';

describe('DsHeaderComponent', () => {
  it('renders a banner landmark and forwards nav items', async () => {
    await TestBed.configureTestingModule({
      imports: [DsHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsHeaderComponent);
    fixture.componentRef.setInput('navItems', [{ label: 'Home', href: '/' }]);
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('[role="banner"]');
    expect(banner).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ds-main-nav')).toBeTruthy();
  });

  it('renders the app variant as one compact row with pill navigation', async () => {
    await TestBed.configureTestingModule({
      imports: [DsHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsHeaderComponent);
    fixture.componentRef.setInput('navItems', [{ label: 'Home', href: '/', icon: 'bi bi-house', active: true }]);
    fixture.componentRef.setInput('variant', 'app');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList).toContain('ds-header--app');
    expect(host.querySelector('ds-main-nav')?.classList).toContain('ds-main-nav--pills');
    expect(host.querySelector('.ds-header__brand')?.classList).not.toContain('px-4');
    expect(host.querySelector('.ds-skip-link')?.getAttribute('href')).toBe('#ds-main-content');
    expect(host.querySelector('[aria-current="page"]')?.textContent?.trim()).toBe('Home');
  });

  it('renders no navigation landmark or menu button without nav items', async () => {
    await TestBed.configureTestingModule({
      imports: [DsHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsHeaderComponent);
    fixture.componentRef.setInput('navItems', []);
    fixture.componentRef.setInput('variant', 'app');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('nav')).toBeNull();
    expect(host.querySelector('.ds-main-nav__toggle')).toBeNull();
    expect(host.querySelector('.ds-skip-link')).not.toBeNull();
    expect(host.querySelector('.ds-header__actions')).not.toBeNull();
  });

  it('keeps the site variant by default', async () => {
    await TestBed.configureTestingModule({
      imports: [DsHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsHeaderComponent);
    fixture.componentRef.setInput('navItems', [{ label: 'Home', href: '/' }]);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList).not.toContain('ds-header--app');
    expect(host.querySelector('.ds-header__brand')?.classList).toContain('px-4');
    expect(host.querySelector('nav')?.classList).toContain('navbar-expand-lg');
  });
});
