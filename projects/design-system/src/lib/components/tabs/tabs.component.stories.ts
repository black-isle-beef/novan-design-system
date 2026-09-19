import type { Meta, StoryObj } from '@storybook/angular';
import { DsTabComponent } from './tab.component';
import { DsTabsComponent } from './tabs.component';

const meta: Meta<DsTabsComponent> = {
  title: 'Components/Navigation/Tabs',
  component: DsTabsComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'WAI-ARIA Tabs pattern with roving tabindex and lazy or eager panel rendering',
      description: {
        component:
          'Generates a `role="tablist"` of buttons from the projected `ds-tab`s\' `label`s, with roving tabindex and ArrowLeft/ArrowRight/Home/End keyboard navigation (skipping disabled tabs). Each `ds-tab` is its own `role="tabpanel"`. By default (`renderMode="lazy"`) a tab\'s content is not instantiated until it is first activated; `renderMode="eager"` renders every panel up front and switches between them with `[hidden]` alone. Bind `[(activeIndex)]` for two-way sync with the selected tab.',
      },
    },
  },
  args: {
    activeIndex: 0,
    renderMode: 'lazy',
    ariaLabel: 'Account settings',
  },
};

export default meta;
type Story = StoryObj<DsTabsComponent>;

export const Default: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [DsTabComponent] },
    props: args,
    template: `
      <ds-tabs [activeIndex]="activeIndex" [renderMode]="renderMode" [ariaLabel]="ariaLabel">
        <ds-tab label="Profile">
          <p>Update your name, photo, and public details.</p>
        </ds-tab>
        <ds-tab label="Billing">
          <p>Manage your plan, payment method, and invoices.</p>
        </ds-tab>
        <ds-tab label="Notifications">
          <p>Choose what you hear about, and how.</p>
        </ds-tab>
      </ds-tabs>
    `,
  }),
};

export const StartingOnASpecificTab: Story = {
  args: { activeIndex: 1 },
  render: Default.render,
};

export const WithADisabledTab: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [DsTabComponent] },
    props: args,
    template: `
      <ds-tabs [activeIndex]="activeIndex" [renderMode]="renderMode" [ariaLabel]="ariaLabel">
        <ds-tab label="Profile">
          <p>Update your name, photo, and public details.</p>
        </ds-tab>
        <ds-tab label="Billing" disabled>
          <p>Manage your plan, payment method, and invoices.</p>
        </ds-tab>
        <ds-tab label="Notifications">
          <p>Choose what you hear about, and how.</p>
        </ds-tab>
      </ds-tabs>
    `,
  }),
};

export const EagerRendering: Story = {
  args: { renderMode: 'eager' },
  parameters: {
    docs: {
      description: {
        story: 'Every panel\'s content renders immediately instead of waiting for its tab to be activated.',
      },
    },
  },
  render: Default.render,
};
