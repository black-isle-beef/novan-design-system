import type { Meta, StoryObj } from '@storybook/angular';
import { DsTypographyFoundationComponent } from './typography-foundation.component';

const meta: Meta<DsTypographyFoundationComponent> = {
  title: 'Foundations/Typography',
  component: DsTypographyFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'Montserrat type scale, weight grid, and live playground',
      description: {
        component:
          'The full Montserrat family — nine self-hosted static weights (Thin-Black, plus italics) and a variable-font axis — demonstrated across the heading/body type scale, a side-by-side weight comparison grid, and an interactive font-size/line-height/letter-spacing/weight playground. Includes a dark-mode toggle to check contrast on dark backgrounds.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsTypographyFoundationComponent>;

export const Default: Story = {};
