import type { Meta, StoryObj } from '@storybook/angular';
import { DsAlertComponent } from './alert.component';

const meta: Meta<DsAlertComponent> = {
  title: 'Components/Feedback/Alert',
  component: DsAlertComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Persistent inline status message, distinct from the auto-dismissing toast',
      description: {
        component:
          'A persistent, inline status message that stays wherever it\'s placed in the page until dismissed (if `dismissible`) or the surrounding content stops rendering it — unlike `DsToastComponent`, which is transient, auto-dismissing, and floats above the page. `danger` and `warning` render with `role="alert"` (assertive, interrupts); `success` and `info` render with `role="status"` (polite, waits its turn).',
      },
    },
  },
  args: {
    variant: 'info',
    title: null,
    dismissible: false,
    closeButtonLabel: 'Dismiss',
  },
};

export default meta;
type Story = StoryObj<DsAlertComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-alert [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        A new version of this page is available. Refresh to see the latest changes.
      </ds-alert>
    `,
  }),
};

export const Success: Story = {
  args: { variant: 'success', title: 'Payment received' },
  render: (args) => ({
    props: args,
    template: `
      <ds-alert [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        Your invoice has been paid in full.
      </ds-alert>
    `,
  }),
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Storage almost full' },
  render: (args) => ({
    props: args,
    template: `
      <ds-alert [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        You've used 92% of your storage quota. Upgrade your plan to avoid interruption.
      </ds-alert>
    `,
  }),
};

export const Danger: Story = {
  args: { variant: 'danger', title: 'Payment failed' },
  render: (args) => ({
    props: args,
    template: `
      <ds-alert [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        We couldn't charge your card. Update your payment method to keep your subscription active.
      </ds-alert>
    `,
  }),
};

export const Dismissible: Story = {
  args: { dismissible: true, title: 'Heads up' },
  render: Default.render,
};

export const NoTitle: Story = {
  args: { title: null },
  render: Default.render,
};
