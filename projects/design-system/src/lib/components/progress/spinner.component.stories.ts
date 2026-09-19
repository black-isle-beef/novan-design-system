import type { Meta, StoryObj } from '@storybook/angular';
import { DsSpinnerComponent } from './spinner.component';

const meta: Meta<DsSpinnerComponent> = {
  title: 'Components/Feedback/Spinner',
  component: DsSpinnerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: "Thin wrapper around Bootstrap's .spinner-border for indeterminate progress",
      description: {
        component:
          'For indeterminate progress — no known value or duration. `role="status"` gives it an implicit polite live region; the visually-hidden `label` is what\'s actually announced, since there\'s no visible text by default. For a larger region that\'s temporarily loading, prefer setting `aria-busy="true"` directly on that region\'s own container over relying on the spinner alone.',
      },
    },
  },
  args: {
    size: 'md',
    label: 'Loading',
  },
};

export default meta;
type Story = StoryObj<DsSpinnerComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-spinner [size]="size" [label]="label" />`,
  }),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: Default.render,
};

export const CustomLabel: Story = {
  args: { label: 'Saving changes' },
  render: Default.render,
};

export const InlineWithText: Story = {
  parameters: {
    docs: { description: { story: 'A common pattern: a small spinner alongside a visible loading message.' } },
  },
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ds-spinner size="sm" label="Saving" />
        <span>Saving changes…</span>
      </div>
    `,
  }),
};
