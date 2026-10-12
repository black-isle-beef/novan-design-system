import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { DsMainNavComponent } from './main-nav.component';
import type { NavItem } from '../../models/nav-item.model';

describe('DsMainNavComponent', () => {
  const items: NavItem[] = [
    { label: 'Home', href: '/', active: true },
    {
      label: 'Products',
      href: '/products',
      children: [{ label: 'Widgets', href: '/products/widgets' }],
    },
  ];

  it('renders a nav landmark with the given aria-label', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Primary');
  });

  it('toggles a dropdown menu open state on click', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const toggleButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.ds-main-nav__link.btn-link',
    );
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');

    toggleButton.click();
    fixture.detectChanges();

    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders internal hrefs via routerLink and external hrefs as plain links', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: 'https://example.com/docs' },
    ]);
    fixture.detectChanges();

    const links: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('.ds-main-nav__link'));
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('https://example.com/docs');
  });

  it('renders an item icon hidden from assistive technology', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', [
      { label: 'Home', href: '/', icon: 'bi bi-house' },
      { label: 'Docs', href: '/docs' },
    ]);
    fixture.detectChanges();

    const links: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('.ds-main-nav__link'));
    const icon = links[0].querySelector('i');
    expect(icon?.classList).toContain('bi-house');
    expect(icon?.classList).toContain('ds-main-nav__icon');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
    expect(links[0].textContent?.trim()).toBe('Home');
    expect(links[1].querySelector('i')).toBeNull();
  });

  it('collapses the pills variant below md instead of lg', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('variant', 'pills');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList).toContain('ds-main-nav--pills');
    expect(host.querySelector('nav')?.classList).toContain('navbar-expand-md');
    expect(host.querySelector('nav')?.classList).not.toContain('navbar-expand-lg');
    expect(host.querySelector('.ds-main-nav__toggle')?.classList).toContain('d-md-none');
    expect(host.querySelector('[aria-current="page"]')?.textContent?.trim()).toBe('Home');
  });
});
