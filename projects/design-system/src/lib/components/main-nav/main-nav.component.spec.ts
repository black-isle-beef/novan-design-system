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

  it('closes the open mobile menu on Escape and returns focus to the menu button', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', [{ label: 'Home', href: '/' }]);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const toggle = host.querySelector<HTMLButtonElement>('.ds-main-nav__toggle')!;
    toggle.click();
    fixture.detectChanges();
    const link = host.querySelector<HTMLAnchorElement>('.ds-main-nav__link')!;
    link.focus();

    link.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(host.querySelector('.ds-main-nav__list')?.classList).not.toContain('ds-main-nav__list--open');
    expect(document.activeElement).toBe(toggle);
  });

  it('closes the open dropdown on Escape from inside it and returns focus to its button', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const button = host.querySelector<HTMLButtonElement>('.ds-main-nav__link.btn-link')!;
    button.click();
    fixture.detectChanges();
    const child = host.querySelector<HTMLAnchorElement>('.menu-item')!;
    child.focus();

    child.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });

  it('closes the mobile menu when a link is followed', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsMainNavComponent);
    fixture.componentRef.setInput('items', [{ label: 'Docs', href: '#docs' }]);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const toggle = host.querySelector<HTMLButtonElement>('.ds-main-nav__toggle')!;
    toggle.click();
    fixture.detectChanges();

    host.querySelector<HTMLAnchorElement>('.ds-main-nav__link')!.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('gives each instance its own menu and dropdown ids for aria-controls', async () => {
    await TestBed.configureTestingModule({
      imports: [DsMainNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const createNav = () => {
      const fixture = TestBed.createComponent(DsMainNavComponent);
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();
      return fixture.nativeElement as HTMLElement;
    };
    const first = createNav();
    const second = createNav();

    for (const host of [first, second]) {
      const menu = host.querySelector('.ds-main-nav__list')!;
      const dropdown = host.querySelector('.ds-main-nav__dropdown')!;
      expect(host.querySelector('.ds-main-nav__toggle')?.getAttribute('aria-controls')).toBe(menu.id);
      expect(host.querySelector('.ds-main-nav__link.btn-link')?.getAttribute('aria-controls')).toBe(dropdown.id);
    }
    expect(first.querySelector('.ds-main-nav__list')!.id).not.toBe(second.querySelector('.ds-main-nav__list')!.id);
    expect(first.querySelector('.ds-main-nav__dropdown')!.id).not.toBe(second.querySelector('.ds-main-nav__dropdown')!.id);
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
    expect(host.querySelector('.ds-main-nav__toggle')?.classList).toContain('md:d-none');
    expect(host.querySelector('.ds-main-nav__toggle')?.classList).not.toContain('lg:d-none');
    expect(host.querySelector('[aria-current="page"]')?.textContent?.trim()).toBe('Home');
  });
});
