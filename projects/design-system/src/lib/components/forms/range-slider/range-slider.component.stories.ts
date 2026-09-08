import type { Meta, StoryObj } from '@storybook/angular';
import { DsRangeSliderComponent } from './range-slider.component';

const meta: Meta<DsRangeSliderComponent> = {
  title: 'Components/Forms/Range Slider',
  component: DsRangeSliderComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Range Sliders with Dynamic Badges',
      description: {
        component: 'Standard .form-range sliders connected to dynamic Reactive Form controls showing real-time numerical badges.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsRangeSliderComponent>;

export const Default: Story = {};
