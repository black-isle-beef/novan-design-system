import type { Meta, StoryObj } from '@storybook/angular';
import { DsSidebarComponent } from './sidebar.component';
import type { SidebarItem } from '../../models/nav-item.model';

const items: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'bi bi-columns-gap', active: true },
  { label: 'Projects', href: '/projects', icon: 'bi bi-bar-chart-line' },
  { label: 'Team', href: '/team', icon: 'bi bi-people' },
  { label: 'Settings', href: '/settings', icon: 'bi bi-sliders2' },
];

const meta: Meta<DsSidebarComponent> = {
  title: 'Components/Navigation/Sidebar',
  component: DsSidebarComponent,
  tags: ['autodocs'],
  args: { items },
  // The rail relies on `align-self: stretch` inside a full-height flex parent
  // (an app shell's `.app-body`) and its nav overlay is absolutely positioned
  // top/bottom against that rail. Without a sized flex ancestor here, the
  // story canvas gives it 0 height. Stand in for the app shell with a fixed-
  // height flex wrapper so the sidebar renders at a representative height.
  decorators: [
    (story) => {
      const rendered = story();
      return {
        ...rendered,
        template: `<div style="display: flex; height: 640px;">${rendered.template}</div>`,
      };
    },
  ],
};

export default meta;
type Story = StoryObj<DsSidebarComponent>;

export const Default: Story = {};
