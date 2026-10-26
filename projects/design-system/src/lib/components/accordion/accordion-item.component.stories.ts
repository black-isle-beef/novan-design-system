import type { Meta, StoryObj } from '@storybook/angular';
import { DsAccordionComponent } from './accordion.component';
import { DsAccordionItemComponent } from './accordion-item.component';

const meta: Meta<DsAccordionItemComponent> = {
  title: 'Components/Disclosure/Accordion',
  component: DsAccordionItemComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: "Bootstrap 6's accordion, built on native <details>/<summary>",
      description: {
        component:
          "Renders Bootstrap 6's accordion markup (`details.accordion-item` > `summary.accordion-header` + `.accordion-body`), which gets click/Enter-Space toggling, the disclosure role, and independent open state for free from the browser. Each `ds-accordion-item` works standalone — several on a page open and close independently of each other. Wrap a group in `ds-accordion` (Bootstrap's `.accordion`) only when they need to be mutually exclusive: the items then share a native `<details name>`, so opening one closes the others. Bootstrap's `accordion-flush`, `accordion-gap` and `accordion-sm` modifiers go on the `ds-accordion` host.",
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
        story:
          'Wrapped in `ds-accordion`, so the items share a native `<details name>` and opening one closes whichever other item was open.',
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

const modifierStory = (modifier: string, story: string): Story => ({
  parameters: { docs: { description: { story } } },
  render: () => ({
    moduleMetadata: { imports: [DsAccordionComponent] },
    template: `
      <ds-accordion class="${modifier}">
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
});

export const Flush = modifierStory(
  'accordion-flush',
  '`class="accordion-flush"` removes the outer border and rounded corners so items sit edge-to-edge in their container.',
);

export const Gapped = modifierStory(
  'accordion-gap',
  '`class="accordion-gap"` separates the items into individually rounded panels.',
);

export const Small = modifierStory(
  'accordion-sm',
  '`class="accordion-sm"` tightens the padding, radius and font size.',
);
