import { Component, effect, signal } from '@angular/core';
import {
  DsBreadcrumbComponent,
  DsButtonComponent,
  DsCookieBannerComponent,
  DsFooterComponent,
  DsFormsComponent,
  DsHeaderComponent,
  DsHeroComponent,
  DsImageBannerComponent,
  type BreadcrumbItem,
  type FooterLinkGroup,
  type NavItem,
} from 'design-system';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'novan-sandbox-theme';

const NAV_ITEMS: NavItem[] = [
  { label: 'Sandbox', href: '#ds-main-content', active: true },
  {
    label: 'Components',
    href: '#',
    children: [
      { label: 'Buttons', href: '#buttons' },
      { label: 'Content banner', href: '#content' },
      { label: 'Forms', href: '#forms' },
    ],
  },
  { label: 'Foundations', href: '#' },
  { label: 'Templates', href: '#' },
];

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: 'Home', href: '#', icon: 'bi bi-house' },
  { label: 'Sandbox' },
];

const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Components',
    links: [
      { label: 'Buttons', href: '#buttons' },
      { label: 'Content banner', href: '#content' },
      { label: 'Forms', href: '#forms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Storybook', href: 'http://localhost:6006' },
      { label: 'Documentation', href: '#' },
    ],
  },
];

// Neutral inline placeholder so the content-banner section has no external
// network dependency (the sandbox is meant to run fully offline).
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#b0b3b5" />
      <path d="M340 260h120v120H340z" fill="#f5f6f8" />
      <circle cx="380" cy="300" r="16" fill="#b0b3b5" />
      <path d="M340 360l40-40 30 30 50-50 60 60v20H340z" fill="#b0b3b5" />
    </svg>
  `);

function readInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Component sandbox: a single served page composing every structural piece
 * of the design system (header + nav, breadcrumb, hero, buttons, content
 * banner, forms, footer, cookie banner) with a runtime dark-mode switch, for
 * manual/visual testing against `nx serve`.
 */
@Component({
  selector: 'app-root',
  imports: [
    DsHeaderComponent,
    DsBreadcrumbComponent,
    DsHeroComponent,
    DsButtonComponent,
    DsImageBannerComponent,
    DsFormsComponent,
    DsFooterComponent,
    DsCookieBannerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly navItems = NAV_ITEMS;
  protected readonly breadcrumbItems = BREADCRUMB_ITEMS;
  protected readonly footerLinkGroups = FOOTER_LINK_GROUPS;
  protected readonly placeholderImage = PLACEHOLDER_IMAGE;

  protected readonly theme = signal<Theme>(readInitialTheme());

  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-bs-theme', this.theme());
      localStorage.setItem(THEME_STORAGE_KEY, this.theme());
    });
  }

  protected toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }
}
