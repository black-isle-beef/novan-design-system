import type { Meta, StoryObj } from '@storybook/angular';
import { DsControlSizesComponent } from './control-sizes.component';

const meta: Meta<DsControlSizesComponent> = {
  title: 'Components/Global/Forms/Control Sizes & File Color',
  component: DsControlSizesComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Control Sizing, File Upload & Color Picker',
      description: {
        component: 'Sizing variations (.form-control-lg, .form-control-sm), file upload inputs, and color picker controls.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsControlSizesComponent>;

export const Default: Story = {};
