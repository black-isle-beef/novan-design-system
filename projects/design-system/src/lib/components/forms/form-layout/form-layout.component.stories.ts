import type { Meta, StoryObj } from '@storybook/angular';
import { DsFormLayoutComponent } from './form-layout.component';

const meta: Meta<DsFormLayoutComponent> = {
  title: 'Components/Global/Forms/Form Layout',
  component: DsFormLayoutComponent,
  parameters: {
    docs: {
      subtitle: 'Bootstrap Grid & Horizontal Form Layouts',
      description: {
        component: 'Bootstrap grid forms (.row, .col-*, .g-3), horizontal form layouts with .col-form-label, and inline form layouts.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsFormLayoutComponent>;

export const Default: Story = {};
