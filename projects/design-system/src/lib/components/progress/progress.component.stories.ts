import type { Meta, StoryObj } from '@storybook/angular';
import { DsProgressComponent } from './progress.component';

const meta: Meta<DsProgressComponent> = {
  title: 'Components/Feedback/Progress',
  component: DsProgressComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: "Thin wrapper around Bootstrap's .progress/.progress-bar for determinate progress",
      description: {
        component:
          'For determinate progress — a known value between `min` and `max`, e.g. an upload. `role="progressbar"` and `aria-value*` live on the inner bar, matching Bootstrap\'s own documented markup. Provide `label` for the accessible name; set `showValueText` to also render the percentage as visible text. For indeterminate progress with no known value, use `ds-spinner` instead.',
      },
    },
  },
  args: {
    value: 40,
    min: 0,
    max: 100,
    label: 'Uploading photo.jpg',
    showValueText: false,
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<DsProgressComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-progress [value]="value" [min]="min" [max]="max" [label]="label" [showValueText]="showValueText" [variant]="variant" />
    `,
  }),
};

export const WithVisibleValue: Story = {
  args: { showValueText: true },
  render: Default.render,
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <ds-progress [value]="70" variant="primary" label="Primary progress" />
        <ds-progress [value]="70" variant="success" label="Success progress" />
        <ds-progress [value]="70" variant="warning" label="Warning progress" />
        <ds-progress [value]="70" variant="danger" label="Danger progress" />
        <ds-progress [value]="70" variant="info" label="Info progress" />
      </div>
    `,
  }),
};

export const Complete: Story = {
  args: { value: 100, showValueText: true },
  render: Default.render,
};
