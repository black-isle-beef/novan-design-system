import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from '../button';
import { DsToastComponent } from './toast.component';
import { DsToastContainerComponent } from './toast-container.component';
import { DsToastService } from './toast.service';

const meta: Meta<DsToastComponent> = {
  title: 'Components/Feedback/Toast',
  component: DsToastComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Auto-dismissing status message raised from a signal-driven queue service',
      description: {
        component:
          'A single toast surface, queued and rendered through `DsToastService` and `DsToastContainerComponent`. Inject `DsToastService` anywhere and call `show()` (or the `success()`/`warning()`/`danger()`/`info()` shorthands) to raise one; place a single `<ds-toast-container>` near the root of the app to render whatever is queued, stacked in a fixed screen corner. Each toast auto-dismisses after `duration` ms (default 5000; pass `null` for a persistent toast) and pauses its timer while it has pointer or keyboard focus. `danger` and `warning` toasts render with `role="alert"` (assertive); `success` and `info` render with `role="status"` (polite).',
      },
    },
  },
  args: {
    variant: 'info',
    title: null,
    dismissible: true,
    closeButtonLabel: 'Dismiss',
  },
};

export default meta;
type Story = StoryObj<DsToastComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-toast [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        Your changes have been saved.
      </ds-toast>
    `,
  }),
};

export const Success: Story = {
  args: { variant: 'success', title: 'Saved' },
  render: Default.render,
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Heads up' },
  render: (args) => ({
    props: args,
    template: `
      <ds-toast [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        Your session expires in 5 minutes.
      </ds-toast>
    `,
  }),
};

export const Danger: Story = {
  args: { variant: 'danger', title: 'Upload failed' },
  render: (args) => ({
    props: args,
    template: `
      <ds-toast [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        The file was too large. Files must be under 10 MB.
      </ds-toast>
    `,
  }),
};

export const Info: Story = {
  args: { variant: 'info', title: 'FYI' },
  render: (args) => ({
    props: args,
    template: `
      <ds-toast [variant]="variant" [title]="title" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">
        A new version is available. Refresh to update.
      </ds-toast>
    `,
  }),
};

export const NoTitle: Story = {
  args: { title: null },
  render: Default.render,
};

export const NotDismissible: Story = {
  args: { dismissible: false, title: 'Processing' },
  render: (args) => ({
    props: args,
    template: `
      <ds-toast [variant]="variant" [title]="title" [dismissible]="dismissible">
        This can't be dismissed until the background job finishes.
      </ds-toast>
    `,
  }),
};

@Component({
  selector: 'ds-toast-trigger-demo',
  standalone: true,
  imports: [DsButtonComponent, DsToastContainerComponent],
  template: `
    <div class="d-flex flex-wrap gap-3">
      <ds-button variant="success" (pressed)="toasts.success('Changes saved.', { title: 'Success' })">
        Trigger success
      </ds-button>
      <ds-button variant="warning" (pressed)="toasts.warning('Your plan expires soon.', { title: 'Heads up' })">
        Trigger warning
      </ds-button>
      <ds-button variant="danger" (pressed)="toasts.danger('Something went wrong.', { title: 'Error' })">
        Trigger danger
      </ds-button>
      <ds-button variant="info" (pressed)="toasts.info('A new version is available.')"> Trigger info </ds-button>
    </div>
    <ds-toast-container position="bottom-end" />
  `,
})
class ToastTriggerDemoComponent {
  protected readonly toasts = inject(DsToastService);
}

export const TriggeredFromButtons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A realistic usage pattern: buttons inject `DsToastService` and call its variant shorthands; a single `<ds-toast-container>` renders whatever is queued and auto-dismisses each entry after 5 seconds.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [ToastTriggerDemoComponent] },
    template: `<ds-toast-trigger-demo />`,
  }),
};
