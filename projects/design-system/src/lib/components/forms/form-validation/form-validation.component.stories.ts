import type { Meta, StoryObj } from '@storybook/angular';
import { DsFormValidationComponent } from './form-validation.component';

const meta: Meta<DsFormValidationComponent> = {
  title: 'Components/Forms/Form Validation',
  component: DsFormValidationComponent,
  parameters: {
    docs: {
      subtitle: 'Complete Reactive Form Validation Suite',
      description: {
        component: 'Client-side rules (required, email, pattern), custom async validator (username check), touched/dirty error display, and submit state management.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsFormValidationComponent>;

export const Default: Story = {};
