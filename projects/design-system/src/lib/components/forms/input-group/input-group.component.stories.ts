import type { Meta, StoryObj } from '@storybook/angular';
import { DsInputGroupComponent } from './input-group.component';

const meta: Meta<DsInputGroupComponent> = {
  title: 'Components/Forms/Input Group',
  component: DsInputGroupComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Input Group Addons & Segmented Controls',
      description: {
        component: 'Prefix/suffix badges (.input-group-text), multiple grouped inputs, segmented dropdowns, and checkbox/radio addons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsInputGroupComponent>;

export const Default: Story = {};
