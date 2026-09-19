import type { Meta, StoryObj } from '@storybook/angular';
import { DsAccordionComponent } from './accordion.component';
import { DsAccordionItemComponent } from './accordion-item.component';

const meta: Meta<DsAccordionItemComponent> = {
  title: 'Components/Disclosure/Accordion',
  component: DsAccordionItemComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Progressive disclosure built on native <details>/<summary>',
      description: {
        component:
          'A single panel built on native `<details>`/`<summary>`, which gets click/Enter-Space toggling, the disclosure role, and independent open state for free from the browser. Each `ds-accordion-item` works standalone — several on a page open and close independently of each other. Wrap a group in `ds-accordion` only when they need to be mutually exclusive: opening one then closes the others.',
      },
    },
  },
  args: {
    summary: 'What payment methods do you accept?',
    open: false,
  },
};

export default meta;
type Story = StoryObj<DsAccordionItemComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-accordion-item [summary]="summary" [open]="open">
        <p>We accept all major credit cards, PayPal, and bank transfer for annual plans.</p>
      </ds-accordion-item>
    `,
  }),
};

export const StartsOpen: Story = {
  args: { open: true },
  render: Default.render,
};

export const IndependentItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bare `ds-accordion-item`s with no coordinating wrapper — each opens and closes on its own.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-accordion-item summary="What payment methods do you accept?">
        <p>We accept all major credit cards, PayPal, and bank transfer for annual plans.</p>
      </ds-accordion-item>
      <ds-accordion-item summary="Can I change plans later?">
        <p>Yes, upgrade or downgrade at any time from your billing settings.</p>
      </ds-accordion-item>
      <ds-accordion-item summary="Do you offer refunds?" open>
        <p>Full refunds are available within 14 days of purchase, no questions asked.</p>
      </ds-accordion-item>
    `,
  }),
};

export const SingleOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Wrapped in `ds-accordion`, so opening one item closes whichever other item was open.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [DsAccordionComponent] },
    template: `
      <ds-accordion>
        <ds-accordion-item summary="What payment methods do you accept?" open>
          <p>We accept all major credit cards, PayPal, and bank transfer for annual plans.</p>
        </ds-accordion-item>
        <ds-accordion-item summary="Can I change plans later?">
          <p>Yes, upgrade or downgrade at any time from your billing settings.</p>
        </ds-accordion-item>
        <ds-accordion-item summary="Do you offer refunds?">
          <p>Full refunds are available within 14 days of purchase, no questions asked.</p>
        </ds-accordion-item>
      </ds-accordion>
    `,
  }),
};
