import type { Meta, StoryObj } from '@storybook/angular';
import { DsHeroComponent } from './hero.component';

const meta: Meta<DsHeroComponent> = {
  title: 'Layout/Hero',
  component: DsHeroComponent,
  tags: ['autodocs'],
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
        <a dsHeroCta class="btn btn-light" href="#">Get started</a>
        <a dsHeroCta class="btn btn-outline-light" href="#">View on GitHub</a>
      </ds-hero>
    `,
  }),
};

export default meta;
type Story = StoryObj<DsHeroComponent>;

export const Primary: Story = {};

export const Dark: Story = {
  args: { variant: 'dark' },
};

export const Light: Story = {
  args: { variant: 'light' },
};

export const Image: Story = {
  args: {
    variant: 'image',
    backgroundImage: 'https://picsum.photos/1600/900',
  },
};
