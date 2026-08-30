import type { Meta, StoryObj } from '@storybook/angular';
import { DsDesignTokensFoundationComponent } from './design-tokens-foundation.component';

const meta: Meta<DsDesignTokensFoundationComponent> = {
  title: 'Foundations/Design Tokens',
  component: DsDesignTokensFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'The searchable, exportable source of truth for every color, type, spacing, shadow, radius, motion, and z-index token',
      description: {
        component:
          'The full design-token architecture: the same brand color palette from Foundations/Brand (Base, Neutrals, Blues, Purples, Greens, Yellows, Reds) mapped to semantic aliases, the typography scale, an 8px/4px spatial rhythm, elevation/shadow tiers, border radii, motion durations/easing, and the z-index stacking order. Each token renders as a visual card with copyable variable/value buttons, supports a live light/dark theme preview for semantic colors, and can be searched, filtered by category, or exported as CSS custom properties, SCSS variables, Bootstrap Sass maps, or JSON.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsDesignTokensFoundationComponent>;

export const Default: Story = {};
