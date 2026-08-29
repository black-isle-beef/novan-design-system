import type { Meta, StoryObj } from '@storybook/angular';
import { DsMainNavComponent } from './main-nav.component';
import type { NavItem } from '../../models/nav-item.model';

const sampleItems: NavItem[] = [
  { label: 'Home', href: '/', active: true },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Widgets', href: '/products/widgets' },
      { label: 'Gadgets', href: '/products/gadgets' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const meta: Meta<DsMainNavComponent> = {
  title: 'Components/Global/MainNav',
  component: DsMainNavComponent,
  tags: ['autodocs'],
  args: {
    items: sampleItems,
    ariaLabel: 'Primary',
  },
};

export default meta;
type Story = StoryObj<DsMainNavComponent>;

export const Default: Story = {};

export const NoDropdowns: Story = {
  args: {
    items: sampleItems.filter((item) => !item.children?.length),
  },
};
