import type { Meta, StoryObj } from '@storybook/angular';
import { DsRadioButtonsComponent } from './radio-buttons.component';

const meta: Meta<DsRadioButtonsComponent> = {
  title: 'Components/Global/Forms/Radio Buttons',
  component: DsRadioButtonsComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Stacked, Inline & Button Toggle Radios',
      description: {
        component: 'Standard stacked radios, inline radio options (.form-check-inline), and toggle button groups (.btn-check).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsRadioButtonsComponent>;

export const Default: Story = {};
