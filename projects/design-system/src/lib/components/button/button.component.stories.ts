import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from './button.component';

const meta: Meta<DsButtonComponent> = {
  title: 'Components/Global/Buttons',
  component: DsButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Accessible semantic action button',
      description: {
        component:
          'A native button that renders Bootstrap’s `btn` and `btn-{variant}` classes. The primary, secondary, success, warning, danger, and info Bootstrap variables are generated from the design-token brand palette. It also supports Bootstrap’s small and large size classes, projected labels and icons, disabled/loading states, and an optional accessible-name override for icon-only usage.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: '<ds-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Save changes</ds-button>',
  }),
};

export default meta;
type Story = StoryObj<DsButtonComponent>;

export const BootstrapVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Each row uses Bootstrap’s `btn-{variant}` class with its default, hover, focus, and disabled styling. Colors and state variables are supplied by the design-token brand palette.',
      },
      source: {
        code: '<ds-button variant="...">Default</ds-button>',
      },
    },
  },
  render: () => ({
    template: `
      <div class="container-fluid px-0">
        <div class="row g-4 align-items-center mb-2">
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-10">
            <div class="row row-cols-2 row-cols-sm-4 g-4 small text-muted">
              <div class="col">Default</div>
              <div class="col">Hover</div>
              <div class="col">Focus</div>
              <div class="col">Disabled</div>
            </div>
          </div>
        </div>
        <div class="row g-4 align-items-center mb-5">
          <div class="col-12 col-md-2 fw-semibold">Primary</div>
          <div class="col-12 col-md-10">
            <div class="row row-cols-2 row-cols-sm-4 g-4">
              <div class="col"><ds-button class="ds-button--full-width" variant="primary">Default</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--hover" variant="primary">Hover</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--focus" variant="primary">Focus</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width" variant="primary" [disabled]="true">Disabled</ds-button></div>
            </div>
          </div>
        </div>
        <div class="row g-4 align-items-center mb-5">
          <div class="col-12 col-md-2 fw-semibold">Secondary</div>
          <div class="col-12 col-md-10">
            <div class="row row-cols-2 row-cols-sm-4 g-4">
              <div class="col"><ds-button class="ds-button--full-width" variant="secondary">Default</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--hover" variant="secondary">Hover</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--focus" variant="secondary">Focus</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width" variant="secondary" [disabled]="true">Disabled</ds-button></div>
            </div>
          </div>
        </div>
        <div class="row g-4 align-items-center mb-5">
          <div class="col-12 col-md-2 fw-semibold">Success</div>
          <div class="col-12 col-md-10">
            <div class="row row-cols-2 row-cols-sm-4 g-4">
              <div class="col"><ds-button class="ds-button--full-width" variant="success">Default</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--hover" variant="success">Hover</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--focus" variant="success">Focus</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width" variant="success" [disabled]="true">Disabled</ds-button></div>
            </div>
          </div>
        </div>
        <div class="row g-4 align-items-center mb-5">
          <div class="col-12 col-md-2 fw-semibold">Warning</div>
          <div class="col-12 col-md-10">
            <div class="row row-cols-2 row-cols-sm-4 g-4">
              <div class="col"><ds-button class="ds-button--full-width" variant="warning">Default</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--hover" variant="warning">Hover</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--focus" variant="warning">Focus</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width" variant="warning" [disabled]="true">Disabled</ds-button></div>
            </div>
          </div>
        </div>
        <div class="row g-4 align-items-center mb-5">
          <div class="col-12 col-md-2 fw-semibold">Danger</div>
          <div class="col-12 col-md-10">
            <div class="row row-cols-2 row-cols-sm-4 g-4">
              <div class="col"><ds-button class="ds-button--full-width" variant="danger">Default</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--hover" variant="danger">Hover</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--focus" variant="danger">Focus</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width" variant="danger" [disabled]="true">Disabled</ds-button></div>
            </div>
          </div>
        </div>
        <div class="row g-4 align-items-center">
          <div class="col-12 col-md-2 fw-semibold">Info</div>
          <div class="col-12 col-md-10">
            <div class="row row-cols-2 row-cols-sm-4 g-4">
              <div class="col"><ds-button class="ds-button--full-width" variant="info">Default</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--hover" variant="info">Hover</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width ds-button--focus" variant="info">Focus</ds-button></div>
              <div class="col"><ds-button class="ds-button--full-width" variant="info" [disabled]="true">Disabled</ds-button></div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const BootstrapSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `sm` and `lg` inputs map to Bootstrap’s `btn-sm` and `btn-lg` classes; `md` uses Bootstrap’s default button size.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="d-flex flex-wrap align-items-center gap-2">
        <ds-button size="sm">Small</ds-button>
        <ds-button size="md">Medium</ds-button>
        <ds-button size="lg">Large</ds-button>
      </div>
    `,
  }),
};

export const Loading: Story = { args: { loading: true } };
export const LongContent: Story = {
  render: (args) => ({
    props: args,
    template: '<ds-button [variant]="variant" [size]="size">Save all pending account changes before continuing to the next step</ds-button>',
  }),
};
export const IconOnly: Story = {
  render: (args) => ({
    props: args,
    template: '<ds-button [variant]="variant" [size]="size" ariaLabel="Add item"><span dsButtonIcon aria-hidden="true">+</span></ds-button>',
  }),
};