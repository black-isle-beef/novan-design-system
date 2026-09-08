import type { Meta, StoryObj } from '@storybook/angular';
import { DsCheckboxesComponent } from './checkboxes.component';

const meta: Meta<DsCheckboxesComponent> = {
  title: 'Components/Forms/Checkboxes & Switches',
  component: DsCheckboxesComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Checkboxes, Switches & Indeterminate States',
      description: {
        component: 'Standard stacked checkboxes, inline checkboxes, switch toggles (.form-switch), and Angular dsIndeterminate directive.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsCheckboxesComponent>;

export const Default: Story = {};
