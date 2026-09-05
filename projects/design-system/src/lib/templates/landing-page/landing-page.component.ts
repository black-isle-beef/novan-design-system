import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DsHeaderComponent } from '../../components/header/header.component';
import { DsHeroComponent, type DsHeroVariant } from '../../components/hero/hero.component';
import { DsFooterComponent } from '../../components/footer/footer.component';
import type { FooterLinkGroup, NavItem } from '../../models/nav-item.model';

/** A single card in the landing page feature grid. */
export interface LandingFeature {
  /** Bootstrap Icons class name(s) for the leading glyph, e.g. `'bi bi-lightning-charge'`. */
  icon: string;
  title: string;
  description: string;
}

/** A single social-proof metric shown in the stats band. */
export interface LandingStat {
  /** The headline figure, pre-formatted (e.g. `'12k+'`, `'99.9%'`). */
  value: string;
  label: string;
}

/** A single customer quote shown in the testimonials section. */
export interface LandingTestimonial {
  quote: string;
  name: string;
  role: string;
}

export const DEFAULT_LANDING_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#', active: true },
  {
    label: 'Product',
    href: '#',
    children: [
      { label: 'Components', href: '#' },
      { label: 'Foundations', href: '#' },
      { label: 'Templates', href: '#' },
    ],
  },
  { label: 'Pricing', href: '#' },
  { label: 'Docs', href: '#' },
];

export const DEFAULT_LANDING_FEATURES: LandingFeature[] = [
  {
    icon: 'bi bi-lightning-charge',
    title: 'Ship faster',
    description: 'Compose production screens from pre-built, accessible primitives instead of starting from a blank file.',
  },
  {
    icon: 'bi bi-palette',
    title: 'Token-driven theming',
    description: 'Every colour, space, and type ramp is a design token, so a single change propagates across the whole product.',
  },
  {
    icon: 'bi bi-universal-access',
    title: 'Accessible by default',
    description: 'Components implement WAI-ARIA patterns, visible focus, and keyboard support out of the box.',
  },
  {
    icon: 'bi bi-diagram-3',
    title: 'Framework-native',
    description: 'Standalone, signal-based Angular components with strong typing and tree-shakeable public exports.',
  },
];

export const DEFAULT_LANDING_STATS: LandingStat[] = [
  { value: '40+', label: 'Production components' },
  { value: '12k+', label: 'Weekly downloads' },
  { value: '99.9%', label: 'Axe pass rate' },
  { value: '6', label: 'Product teams' },
];

export const DEFAULT_LANDING_TESTIMONIALS: LandingTestimonial[] = [
  {
    quote: 'We cut our design-to-build handoff time in half. The tokens mean engineering and design finally speak the same language.',
    name: 'Priya Nair',
    role: 'Head of Design, Northwind',
  },
  {
    quote: 'Accessibility used to be a end-of-project scramble. Now it is just how the components work, so our audits are boring.',
    name: 'Marcus Lee',
    role: 'Staff Engineer, Contoso',
  },
  {
    quote: 'Rolling out a full rebrand was a single pull request against the token set. It would have been a quarter of work before.',
    name: 'Sofia Alvarez',
    role: 'Director of Product, Fabrikam',
  },
];

export const DEFAULT_LANDING_FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Components', href: '#' },
      { label: 'Foundations', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Getting started', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

/**
 * Composed, production-shaped landing page template: site header + primary
 * navigation, a hero with paired CTAs, a feature grid, a social-proof stats
 * band, customer testimonials, a closing call-to-action banner, and the
 * multi-column site footer. Every region is built from existing design-system
 * components and token-driven Bootstrap utilities, and every piece of content
 * is exposed as an input so it can be driven from Storybook controls.
 */
@Component({
  selector: 'ds-landing-page',
  standalone: true,
  imports: [DsHeaderComponent, DsHeroComponent, DsFooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-landing-page',
  },
})
export class DsLandingPageComponent {
  /** Brand wordmark rendered in the header. */
  readonly brandName = input('Novan');
  /** Primary navigation entries forwarded to the header/nav. */
  readonly navItems = input<NavItem[]>(DEFAULT_LANDING_NAV_ITEMS);

  /** Hero background treatment; also decides which CTA button variant is used. */
  readonly heroVariant = input<DsHeroVariant>('primary');
  /** Main hero heading (rendered as the page `<h1>`). */
  readonly heroHeading = input('Design once. Ship everywhere.');
  /** Supporting hero copy. */
  readonly heroSubheading = input<string | undefined>(
    'A token-driven Angular + Bootstrap design system for building consistent, accessible products at speed.',
  );
  /** Optional hero background image URL, used when `heroVariant="image"`. */
  readonly heroBackgroundImage = input<string | undefined>(undefined);
  readonly primaryCtaLabel = input('Get started');
  readonly primaryCtaHref = input('#');
  readonly secondaryCtaLabel = input('View documentation');
  readonly secondaryCtaHref = input('#');

  readonly featuresHeading = input('Everything you need to build consistently');
  readonly featuresSubheading = input<string | undefined>(
    'Primitives, patterns, and tokens that stay in sync from the first prototype to the shipped release.',
  );
  readonly features = input<LandingFeature[]>(DEFAULT_LANDING_FEATURES);

  readonly stats = input<LandingStat[]>(DEFAULT_LANDING_STATS);

  readonly testimonialsHeading = input('Teams building with Novan');
  readonly testimonials = input<LandingTestimonial[]>(DEFAULT_LANDING_TESTIMONIALS);

  readonly ctaBannerHeading = input('Ready to build your next product?');
  readonly ctaBannerText = input<string | undefined>(
    'Install the package, drop in the theme, and compose your first screen in minutes.',
  );
  readonly ctaBannerCtaLabel = input('Create your first project');
  readonly ctaBannerCtaHref = input('#');

  /** Grouped link columns rendered in the footer. */
  readonly footerLinkGroups = input<FooterLinkGroup[]>(DEFAULT_LANDING_FOOTER_GROUPS);
  /** Organisation name interpolated into the footer copyright line. */
  readonly organizationName = input('Novan Inc.');
  /** Optional legal disclaimer projected into the footer. */
  readonly footerLegal = input<string | undefined>('Registered in Delaware, USA.');

  /**
   * Light hero backgrounds pair with the brand-blue `btn-hero-dark` CTA;
   * the dark backgrounds (`primary`, `dark`, `image`) pair with `btn-hero-light`.
   */
  protected readonly heroCtaClass = computed(() =>
    this.heroVariant() === 'light' ? 'btn btn-hero-dark' : 'btn btn-hero-light',
  );
}
