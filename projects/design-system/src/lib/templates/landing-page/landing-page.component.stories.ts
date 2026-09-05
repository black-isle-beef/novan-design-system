import type { Meta, StoryObj } from '@storybook/angular';
import {
  DsLandingPageComponent,
  DEFAULT_LANDING_FEATURES,
  DEFAULT_LANDING_FOOTER_GROUPS,
  DEFAULT_LANDING_NAV_ITEMS,
  DEFAULT_LANDING_STATS,
  DEFAULT_LANDING_TESTIMONIALS,
} from './landing-page.component';

/**
 * Custom viewport presets so the Storybook toolbar can preview the template at
 * the design system's mobile / tablet / desktop breakpoints. Individual stories
 * below also lock one of these in via `globals.viewport`.
 */
const LANDING_VIEWPORTS = {
  mobile: { name: 'Mobile (375px)', styles: { width: '375px', height: '812px' }, type: 'mobile' },
  tablet: { name: 'Tablet (768px)', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
  desktop: { name: 'Desktop (1440px)', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
} as const;

const meta: Meta<DsLandingPageComponent> = {
  title: 'Templates/Landing Page',
  component: DsLandingPageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      options: LANDING_VIEWPORTS,
    },
    docs: {
      subtitle: 'Production-shaped marketing page composition',
      description: {
        component:
          'A full, responsive landing page assembled entirely from existing design-system components — `DsHeaderComponent` (with `DsMainNavComponent`), `DsHeroComponent`, and `DsFooterComponent` — plus token-driven Bootstrap utility layout for the hero CTAs, feature grid, social-proof stats band, testimonials, and closing call-to-action banner. Every piece of content (nav items, hero copy and CTAs, features, stats, testimonials, footer links) is an input, so it can be edited live from the Controls panel. Use the viewport toolbar, or the Mobile / Tablet / Desktop stories, to check responsiveness.',
      },
    },
  },
  argTypes: {
    heroVariant: {
      control: 'select',
      options: ['primary', 'dark', 'light', 'image'],
      description: 'Hero background treatment. Also selects the paired CTA button variant.',
    },
    heroBackgroundImage: { control: 'text' },
    brandName: { control: 'text' },
    heroHeading: { control: 'text' },
    heroSubheading: { control: 'text' },
    primaryCtaLabel: { control: 'text' },
    secondaryCtaLabel: { control: 'text' },
    featuresHeading: { control: 'text' },
    featuresSubheading: { control: 'text' },
    testimonialsHeading: { control: 'text' },
    ctaBannerHeading: { control: 'text' },
    ctaBannerText: { control: 'text' },
    ctaBannerCtaLabel: { control: 'text' },
    organizationName: { control: 'text' },
    footerLegal: { control: 'text' },
    navItems: { control: 'object' },
    features: { control: 'object' },
    stats: { control: 'object' },
    testimonials: { control: 'object' },
    footerLinkGroups: { control: 'object' },
  },
  args: {
    brandName: 'novan',
    navItems: DEFAULT_LANDING_NAV_ITEMS,
    heroVariant: 'primary',
    heroHeading: 'Design once. Ship everywhere.',
    heroSubheading:
      'A token-driven Angular + Bootstrap design system for building consistent, accessible products at speed.',
    primaryCtaLabel: 'Get started',
    primaryCtaHref: '#',
    secondaryCtaLabel: 'View documentation',
    secondaryCtaHref: '#',
    featuresHeading: 'Everything you need to build consistently',
    featuresSubheading:
      'Primitives, patterns, and tokens that stay in sync from the first prototype to the shipped release.',
    features: DEFAULT_LANDING_FEATURES,
    stats: DEFAULT_LANDING_STATS,
    testimonialsHeading: 'Teams building with Novan',
    testimonials: DEFAULT_LANDING_TESTIMONIALS,
    ctaBannerHeading: 'Ready to build your next product?',
    ctaBannerText: 'Install the package, drop in the theme, and compose your first screen in minutes.',
    ctaBannerCtaLabel: 'Create your first project',
    ctaBannerCtaHref: '#',
    footerLinkGroups: DEFAULT_LANDING_FOOTER_GROUPS,
    organizationName: 'Novan Inc.',
    footerLegal: 'Registered in Delaware, USA.',
  },
};

export default meta;
type Story = StoryObj<DsLandingPageComponent>;

/** The default composition at the viewport Storybook is currently sized to. */
export const Default: Story = {};

/**
 * Light hero variant — swaps the hero background to the muted surface and the
 * paired CTAs to the brand-blue `btn-hero-dark` treatment.
 */
export const LightHero: Story = {
  args: { heroVariant: 'light' },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  parameters: {
    docs: {
      description: { story: 'Single-column layout: nav collapses to the toggle, grids stack to one card per row.' },
    },
  },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
  parameters: {
    docs: {
      description: { story: 'Two-up feature and testimonial grids; section padding steps up from the mobile scale.' },
    },
  },
};

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: {
    docs: {
      description: { story: 'Full four-up feature grid inside the centred 1200px content column.' },
    },
  },
};
