import type { Meta, StoryObj } from '@storybook/angular';
import { DsSidebarComponent } from './sidebar.component';
import type { SidebarItem } from '../../models/nav-item.model';

const items: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊', active: true },
  { label: 'Projects', href: '/projects', icon: '📁' },
  { label: 'Team', href: '/team', icon: '👥' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

const meta: Meta<DsSidebarComponent> = {
  title: 'Components/Sidebar',
  component: DsSidebarComponent,
  tags: ['autodocs'],
  args: { items },
};

export default meta;
type Story = StoryObj<DsSidebarComponent>;

export const Default: Story = {};
