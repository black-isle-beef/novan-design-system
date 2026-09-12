import type { Meta, StoryObj } from '@storybook/angular';
import { DsLogoFoundationComponent } from './logo-foundation.component';

const meta: Meta<DsLogoFoundationComponent> = {
  title: 'Foundations/Logos',
  component: DsLogoFoundationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      subtitle: 'Novan Web Services logo lockups, color/background pairing, and responsive usage',
      description: {
        component:
          'The Novan Web Services logo system: the primary lockup for desktop and site use, the compact lockup for tablet and mobile, which mark color to use on which background, a responsive site-header preview, and copyable HTML/CSS pairing the scalable SVG mark with live "novan web services" text.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsLogoFoundationComponent>;

export const Default: Story = {};
