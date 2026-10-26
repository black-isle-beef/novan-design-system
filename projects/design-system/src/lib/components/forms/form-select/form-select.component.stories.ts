import type { Meta, StoryObj } from '@storybook/angular';
import { DsFormSelectComponent } from './form-select.component';

const meta: Meta<DsFormSelectComponent> = {
  title: 'Components/Forms/Form Select',
  component: DsFormSelectComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Select Controls & Sizing',
      description: {
        component: 'Single select, multi-select, sizing variations (.form-control-sm, .form-control-lg), and disabled options.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsFormSelectComponent>;

export const Default: Story = {};
