import type { Meta, StoryObj } from '@storybook/angular';
import { DsDropdownComponent } from './dropdown.component';
import { DsMenuItemComponent } from './menu-item.component';

const meta: Meta<DsDropdownComponent> = {
  title: 'Components/Overlay/Dropdown',
  component: DsDropdownComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'WAI-ARIA Menu Button pattern with roving tabindex, arrow-key navigation, and typeahead',
      description: {
        component:
          'A trigger button (`aria-haspopup="menu"`) that opens a `role="menu"` list of `ds-menu-item`s. Arrow keys move roving tabindex between items, Home/End jump to the first/last enabled item, typing jumps to the next item whose label starts with what was typed, and activating an item closes the menu. The trigger opens the menu via native `popovertarget`/`popovertargetaction="toggle"` invoker attributes on a `popover="auto"` element, which gets top-layer stacking, outside-click light-dismiss, and Escape-to-close for free from the browser — ArrowDown/ArrowUp on the closed trigger and all in-menu navigation are the only parts this component still owns itself.',
      },
    },
  },
  args: {
    label: 'Actions',
    position: 'bottom-start',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<DsDropdownComponent>;

export const Default: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [DsMenuItemComponent] },
    props: args,
    template: `
      <div style="padding: 4rem 2rem;">
        <ds-dropdown [label]="label" [position]="position" [disabled]="disabled">
          <ds-menu-item>Rename</ds-menu-item>
          <ds-menu-item>Duplicate</ds-menu-item>
          <ds-menu-item disabled>Share (unavailable)</ds-menu-item>
          <ds-menu-item>Delete</ds-menu-item>
        </ds-dropdown>
      </div>
    `,
  }),
};

export const BottomEnd: Story = {
  args: { position: 'bottom-end' },
  render: Default.render,
};

export const TopStart: Story = {
  args: { position: 'top-start' },
  render: (args) => ({
    moduleMetadata: { imports: [DsMenuItemComponent] },
    props: args,
    template: `
      <div style="padding: 8rem 2rem 2rem;">
        <ds-dropdown [label]="label" [position]="position" [disabled]="disabled">
          <ds-menu-item>Rename</ds-menu-item>
          <ds-menu-item>Duplicate</ds-menu-item>
          <ds-menu-item>Delete</ds-menu-item>
        </ds-dropdown>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};

export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: { story: 'Disabled items are skipped by arrow-key, Home/End, and typeahead navigation.' },
    },
  },
  render: (args) => ({
    moduleMetadata: { imports: [DsMenuItemComponent] },
    props: args,
    template: `
      <div style="padding: 4rem 2rem;">
        <ds-dropdown [label]="label" [position]="position">
          <ds-menu-item disabled>Rename (unavailable)</ds-menu-item>
          <ds-menu-item>Duplicate</ds-menu-item>
          <ds-menu-item disabled>Share (unavailable)</ds-menu-item>
          <ds-menu-item>Delete</ds-menu-item>
        </ds-dropdown>
      </div>
    `,
  }),
};
