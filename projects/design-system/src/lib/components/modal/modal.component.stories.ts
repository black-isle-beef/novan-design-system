import { Component, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from '../button';
import { DsModalComponent } from './modal.component';

const meta: Meta<DsModalComponent> = {
  title: 'Components/Overlay/Modal',
  component: DsModalComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Accessible modal dialog built on the native <dialog> element',
      description: {
        component:
          'Accessible modal dialog built on the native `<dialog>` element, which provides top-layer stacking, a focus trap, and (in current browsers) focus restoration for free. Visibility is controlled by the parent through the `open` input; bind `[(open)]` for two-way sync. Escape, the backdrop, and the built-in close button can all be turned off together with `dismissible="false"` for flows that require an explicit in-content action before the modal may close.',
      },
    },
  },
  args: {
    open: true,
    heading: 'Delete project',
    size: 'md',
    dismissible: true,
    closeButtonLabel: 'Close',
  },
};

export default meta;
type Story = StoryObj<DsModalComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-modal
        [open]="open"
        [heading]="heading"
        [size]="size"
        [dismissible]="dismissible"
        [closeButtonLabel]="closeButtonLabel"
      >
        <p>This action can't be undone. It will permanently delete the project and remove your access to it.</p>
      </ds-modal>
    `,
  }),
};

export const WithFooterActions: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [DsButtonComponent] },
    props: args,
    template: `
      <ds-modal
        [open]="open"
        [heading]="heading"
        [size]="size"
        [dismissible]="dismissible"
        [closeButtonLabel]="closeButtonLabel"
      >
        <p>This action can't be undone. It will permanently delete the project and remove your access to it.</p>
        <ds-button dsModalFooter variant="secondary">Cancel</ds-button>
        <ds-button dsModalFooter variant="danger">Delete project</ds-button>
      </ds-modal>
    `,
  }),
};

export const Small: Story = {
  args: { size: 'sm', heading: 'Sign out?' },
};

export const Large: Story = {
  args: { size: 'lg', heading: 'Project settings' },
};

export const NotDismissible: Story = {
  args: {
    heading: 'Finish setup',
    dismissible: false,
  },
  render: (args) => ({
    moduleMetadata: { imports: [DsButtonComponent] },
    props: args,
    template: `
      <ds-modal
        [open]="open"
        [heading]="heading"
        [size]="size"
        [dismissible]="dismissible"
      >
        <p>Escape, the backdrop, and the close button are all disabled here — finish or cancel from inside the dialog.</p>
        <ds-button dsModalFooter variant="primary">Finish setup</ds-button>
      </ds-modal>
    `,
  }),
};

@Component({
  selector: 'ds-modal-trigger-demo',
  standalone: true,
  imports: [DsModalComponent, DsButtonComponent],
  template: `
    <ds-button (pressed)="open.set(true)">Open modal</ds-button>
    <ds-modal [(open)]="open" heading="Invite teammates">
      <p>Two-way bound with <code>[(open)]</code> — the trigger button and the modal's own close affordances all stay in sync.</p>
    </ds-modal>
  `,
})
class ModalTriggerDemoComponent {
  readonly open = signal(false);
}

export const TriggeredFromAButton: Story = {
  parameters: { docs: { description: { story: 'A realistic usage pattern: a trigger button opens the modal via `[(open)]` two-way binding.' } } },
  render: () => ({ moduleMetadata: { imports: [ModalTriggerDemoComponent] }, template: `<ds-modal-trigger-demo />` }),
};
