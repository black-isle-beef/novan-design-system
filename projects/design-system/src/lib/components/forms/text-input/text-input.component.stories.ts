import type { Meta, StoryObj } from '@storybook/angular';
import { DsTextInputComponent } from './text-input.component';

const meta: Meta<DsTextInputComponent> = {
  title: 'Components/Forms/Text Input',
  component: DsTextInputComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Text Input Controls & Floating Labels',
      description: {
        component:
          'Text, email, password (with show/hide toggle), search, disabled, readonly states, floating labels, and dual-binding ngModel context.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsTextInputComponent>;

export const Default: Story = {};
