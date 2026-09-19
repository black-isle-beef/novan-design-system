import type { Meta, StoryObj } from '@storybook/angular';
import { DsBadgeComponent } from './badge.component';

const meta: Meta<DsBadgeComponent> = {
  title: 'Components/Content/Badge',
  component: DsBadgeComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Small label for a status, category, or filter — badge, tag, or pill depending on context',
      description: {
        component:
          'Purely decorative by default (no ARIA role). When `dismissible`, an inline close button lets the reader request removal — it emits `dismissed` rather than removing itself, since a tag\'s presence is normally driven by the surrounding list (e.g. a set of active filters) rather than local state.',
      },
    },
  },
  args: {
    variant: 'neutral',
    dismissible: false,
    closeButtonLabel: 'Remove',
  },
};

export default meta;
type Story = StoryObj<DsBadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-badge [variant]="variant" [dismissible]="dismissible" [closeButtonLabel]="closeButtonLabel">Draft</ds-badge>`,
  }),
};

export const AllVariants: Story = {
  parameters: { docs: { description: { story: 'Every semantic variant, side by side.' } } },
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <ds-badge variant="primary">Primary</ds-badge>
        <ds-badge variant="secondary">Secondary</ds-badge>
        <ds-badge variant="success">Success</ds-badge>
        <ds-badge variant="warning">Warning</ds-badge>
        <ds-badge variant="danger">Danger</ds-badge>
        <ds-badge variant="info">Info</ds-badge>
        <ds-badge variant="neutral">Neutral</ds-badge>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  args: { dismissible: true, closeButtonLabel: 'Remove Draft filter' },
  render: Default.render,
};

export const DismissibleFilterList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic usage pattern: a row of active filters, each dismissible, as a set of neutral tags.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <ds-badge variant="neutral" dismissible closeButtonLabel="Remove Status: Draft filter">Status: Draft</ds-badge>
        <ds-badge variant="neutral" dismissible closeButtonLabel="Remove Assignee: Me filter">Assignee: Me</ds-badge>
        <ds-badge variant="neutral" dismissible closeButtonLabel="Remove Priority: High filter">Priority: High</ds-badge>
      </div>
    `,
  }),
};
