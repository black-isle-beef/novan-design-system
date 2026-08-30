import type { Meta, StoryObj } from '@storybook/angular';
import { DsBrandFoundationComponent } from './brand-foundation.component';

const meta: Meta<DsBrandFoundationComponent> = {
  title: 'Foundations/Brand',
  component: DsBrandFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      subtitle: 'Modular brand color palette and live role-assignment demo',
      description: {
        component:
          'The design system color palette, organized into cohesive families (base, neutrals, blues, purples, greens, yellows, reds). Assign palette colors to brand roles (primary/secondary/tertiary/success/warning/danger) — or keep the defaults — and preview the result live across typography, buttons, inputs, and feedback components.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsBrandFoundationComponent>;

export const Default: Story = {};
