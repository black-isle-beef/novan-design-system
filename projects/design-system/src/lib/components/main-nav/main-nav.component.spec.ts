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
});
