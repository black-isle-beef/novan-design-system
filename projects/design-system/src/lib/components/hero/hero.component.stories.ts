import type { Meta, StoryObj } from '@storybook/angular';
import { DsHeroComponent } from './hero.component';

const meta: Meta<DsHeroComponent> = {
  title: 'Components/Global/Hero',
  component: DsHeroComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'Flexible hero/banner section',
      description: {
        component:
          'Flexible hero/banner section with configurable background variants, a heading/subheading, and projected CTA button slot(s).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'dark', 'light', 'image'],
    },
  },
  args: {
    heading: 'Design once. Ship everywhere.',
    subheading: 'A token-driven Angular + Bootstrap design system for consistent, accessible products.',
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-hero [heading]="heading" [subheading]="subheading" [variant]="variant" [backgroundImage]="backgroundImage">
        <a dsHeroCta class="btn btn-hero-light" href="#">Get started</a>
        <button dsHeroCta type="button" class="btn btn-hero-light">View on GitHub</button>
      </ds-hero>
    `,
  }),
};

export default meta;
type Story = StoryObj<DsHeroComponent>;

/**
 * Dark hero backgrounds (`primary`, `dark`, `image`) pair with the
 * `btn-hero-light` CTA variant.
 */
export const Primary: Story = {};

export const Dark: Story = {
  args: { variant: 'dark' },
};

/**
 * Light hero backgrounds pair with the `btn-hero-dark` CTA variant
 * (brand-blue background/border, white text).
 */
export const Light: Story = {
  args: { variant: 'light' },
  render: (args) => ({
    props: args,
    template: `
      <ds-hero [heading]="heading" [subheading]="subheading" [variant]="variant">
        <a dsHeroCta class="btn btn-hero-dark" href="#">Get started</a>
        <button dsHeroCta type="button" class="btn btn-hero-dark">View on GitHub</button>
      </ds-hero>
    `,
  }),
};

export const Image: Story = {
  args: {
    variant: 'image',
    backgroundImage: '/hero-banner-example.jpg',
  },
};
