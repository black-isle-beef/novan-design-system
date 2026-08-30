import type { Meta, StoryObj } from '@storybook/angular';
import { DsFormsComponent } from './forms.component';

const meta: Meta<DsFormsComponent> = {
  title: 'Components/Global/Forms/Showcase Dashboard',
  component: DsFormsComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Comprehensive, production-ready Angular component suite and showcase page for Bootstrap-styled Form Controls',
      description: {
        component:
          'Interactive documentation dashboard and production-ready code suite for Bootstrap 5 form controls integrated with Angular Reactive Forms, custom async validators, floating labels, input groups, switches, range sliders, and grid layouts.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsFormsComponent>;

export const Default: Story = {};
