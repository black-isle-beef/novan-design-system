import type { Meta, StoryObj } from '@storybook/angular';
import { DsLayoutFoundationComponent } from './layout-foundation.component';

const meta: Meta<DsLayoutFoundationComponent> = {
  title: 'Foundations/Layout',
  component: DsLayoutFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'Spatial scale, breakpoints, containers, and structural page/nav patterns',
      description: {
        component:
          'The layout and grid foundations: an 8px spatial scale, responsive breakpoints (mobile/tablet/desktop/wide), named container widths, and a 12-column grid — plus interactive, copyable code for top/sidebar/combined navigation shells and landing/content/dashboard page templates, each previewable at desktop, tablet, and mobile widths.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsLayoutFoundationComponent>;

export const Default: Story = {};
