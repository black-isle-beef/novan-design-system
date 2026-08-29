import type { Meta, StoryObj } from '@storybook/angular';
import { DsHeaderComponent } from './header.component';
import type { NavItem } from '../../models/nav-item.model';

const navItems: NavItem[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
];

const meta: Meta<DsHeaderComponent> = {
  title: 'Components/Structural/Header',
  component: DsHeaderComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { navItems },
  render: (args) => ({
    props: args,
    template: `
      <ds-header [navItems]="navItems">
        <strong dsBrand>Novan&nbsp;DS</strong>
      </ds-header>
    `,
  }),
};

export default meta;
type Story = StoryObj<DsHeaderComponent>;

export const Default: Story = {};
