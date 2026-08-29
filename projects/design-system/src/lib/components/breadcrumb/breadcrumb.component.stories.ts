import type { Meta, StoryObj } from '@storybook/angular';
import { DsBreadcrumbComponent } from './breadcrumb.component';
import type { BreadcrumbItem } from '../../models/nav-item.model';

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: 'bi bi-house' },
  { label: 'Products', href: '/products' },
  { label: 'Widgets' },
];

const meta: Meta<DsBreadcrumbComponent> = {
  title: 'Components/Navigation/Breadcrumb',
  component: DsBreadcrumbComponent,
  tags: ['autodocs'],
  args: { items },
};

export default meta;
type Story = StoryObj<DsBreadcrumbComponent>;

export const Default: Story = {};

export const ShallowTrail: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'bi bi-house' },
      { label: 'Settings' },
    ],
  },
};
