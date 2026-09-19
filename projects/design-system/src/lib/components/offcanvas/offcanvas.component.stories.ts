import { Component, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from '../button';
import { DsOffcanvasComponent } from './offcanvas.component';

const meta: Meta<DsOffcanvasComponent> = {
  title: 'Components/Overlay/Offcanvas',
  component: DsOffcanvasComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Accessible off-canvas drawer built on the native <dialog> element',
      description: {
        component:
          'Accessible off-canvas drawer built on the native `<dialog>` element — the same foundation as `ds-modal` (top-layer stacking, a focus trap, and focus restoration for free), except the surface is anchored to a viewport edge via `placement` and slides in from it instead of appearing centered. Visibility is controlled by the parent through the `open` input; bind `[(open)]` for two-way sync. Escape, the backdrop, and the built-in close button can all be turned off together with `dismissible="false"` for flows that require an explicit in-content action before the drawer may close.',
      },
    },
  },
  args: {
    open: true,
    heading: 'Filters',
    placement: 'start',
    dismissible: true,
    closeButtonLabel: 'Close',
  },
};

export default meta;
type Story = StoryObj<DsOffcanvasComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-offcanvas
        [open]="open"
        [heading]="heading"
        [placement]="placement"
        [dismissible]="dismissible"
        [closeButtonLabel]="closeButtonLabel"
      >
        <p>Narrow the results by category, price, and availability.</p>
      </ds-offcanvas>
    `,
  }),
};

export const WithFooterActions: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [DsButtonComponent] },
    props: args,
    template: `
      <ds-offcanvas
        [open]="open"
        [heading]="heading"
        [placement]="placement"
        [dismissible]="dismissible"
        [closeButtonLabel]="closeButtonLabel"
      >
        <p>Narrow the results by category, price, and availability.</p>
        <ds-button dsOffcanvasFooter variant="secondary">Reset</ds-button>
        <ds-button dsOffcanvasFooter variant="primary">Apply filters</ds-button>
      </ds-offcanvas>
    `,
  }),
};

export const End: Story = {
  args: { placement: 'end', heading: 'Cart' },
};

export const Top: Story = {
  args: { placement: 'top', heading: 'Announcements' },
};

export const Bottom: Story = {
  args: { placement: 'bottom', heading: 'Cookie preferences' },
};

export const NotDismissible: Story = {
  args: {
    heading: 'Finish checkout',
    dismissible: false,
  },
  render: (args) => ({
    moduleMetadata: { imports: [DsButtonComponent] },
    props: args,
    template: `
      <ds-offcanvas
        [open]="open"
        [heading]="heading"
        [placement]="placement"
        [dismissible]="dismissible"
      >
        <p>Escape, the backdrop, and the close button are all disabled here — finish or cancel from inside the drawer.</p>
        <ds-button dsOffcanvasFooter variant="primary">Finish checkout</ds-button>
      </ds-offcanvas>
    `,
  }),
};

@Component({
  selector: 'ds-offcanvas-trigger-demo',
  standalone: true,
  imports: [DsOffcanvasComponent, DsButtonComponent],
  template: `
    <ds-button (pressed)="open.set(true)">Open filters</ds-button>
    <ds-offcanvas [(open)]="open" heading="Filters">
      <p>Two-way bound with <code>[(open)]</code> — the trigger button and the drawer's own close affordances all stay in sync.</p>
    </ds-offcanvas>
  `,
})
class OffcanvasTriggerDemoComponent {
  readonly open = signal(false);
}

export const TriggeredFromAButton: Story = {
  parameters: { docs: { description: { story: 'A realistic usage pattern: a trigger button opens the drawer via `[(open)]` two-way binding.' } } },
  render: () => ({ moduleMetadata: { imports: [OffcanvasTriggerDemoComponent] }, template: `<ds-offcanvas-trigger-demo />` }),
};
