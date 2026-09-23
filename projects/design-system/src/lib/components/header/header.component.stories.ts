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
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'Structural site header',
      description: {
        component:
          'Structural site header. Renders the `banner` landmark, a projected branding slot, and an integrated `DsMainNavComponent`. Its built-in "Skip to main content" link targets `#ds-main-content` — give the page\'s `<main>` that id, as shown in this story, or the skip link will have nothing to jump to.',
      },
    },
  },
  args: { navItems },
  render: (args) => ({
    props: args,
    template: `
      <ds-header [navItems]="navItems">
        <strong dsBrand>Novan&nbsp;DS</strong>
      </ds-header>
      <main id="ds-main-content">Page content goes here.</main>
    `,
  }),
};

export default meta;
type Story = StoryObj<DsHeaderComponent>;

export const Default: Story = {};
