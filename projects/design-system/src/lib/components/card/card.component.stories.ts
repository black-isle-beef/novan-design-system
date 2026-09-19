import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from '../button';
import { DsCardComponent } from './card.component';

const meta: Meta<DsCardComponent> = {
  title: 'Components/Content/Card',
  component: DsCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Structural content container with optional media, header, and footer slots',
      description: {
        component:
          'A structural container with the same named-slot API consistency as the modal: `[dsCardMedia]`, `[dsCardHeader]`, a default slot for the body, and `[dsCardFooter]`. Any slot left empty collapses instead of leaving behind empty padding. Rests at `elevation.component.card`; set `hoverable` to lift it to `elevation.component.card-hover` on hover/focus-within, for cards that wrap an interactive element like a link.',
      },
    },
  },
  args: {
    hoverable: false,
  },
};

export default meta;
type Story = StoryObj<DsCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-inline-size: 22rem;">
        <ds-card [hoverable]="hoverable">
          <h3 dsCardHeader class="h5 mb-2">Plain and simple</h3>
          <p class="mb-0">A card with just a header and body — no media, no footer.</p>
        </ds-card>
      </div>
    `,
  }),
};

export const WithMedia: Story = {
  parameters: {
    docs: {
      description: { story: 'An `<img dsCardMedia>` projected into the media slot, cropped to a 16:9 frame.' },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-inline-size: 22rem;">
        <ds-card [hoverable]="hoverable">
          <img dsCardMedia src="/card-example-nebula.jpg" alt="A star-forming nebula, glowing red and pink against a starfield." />
          <h3 dsCardHeader class="h5 mb-2">Deep sky imaging</h3>
          <p class="mb-0">A weekend project: 4 hours of stacked exposures on a narrowband rig.</p>
        </ds-card>
      </div>
    `,
  }),
};

export const WithFooterActions: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [DsButtonComponent] },
    props: args,
    template: `
      <div style="max-inline-size: 22rem;">
        <ds-card [hoverable]="hoverable">
          <img dsCardMedia src="/card-example-amber-glass.jpg" alt="Amber-toned abstract render of curved glass surfaces." />
          <h3 dsCardHeader class="h5 mb-2">Pro plan</h3>
          <p class="mb-0">Everything in Starter, plus priority support and unlimited projects.</p>
          <ds-button dsCardFooter variant="primary">Upgrade</ds-button>
        </ds-card>
      </div>
    `,
  }),
};

export const Hoverable: Story = {
  args: { hoverable: true },
  parameters: {
    docs: {
      description: {
        story: 'Lifts from `elevation.component.card` to `elevation.component.card-hover` on hover/focus-within.',
      },
    },
  },
  render: WithMedia.render,
};

export const BodyOnly: Story = {
  parameters: {
    docs: { description: { story: 'No header, media, or footer projected — just the default body slot.' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-inline-size: 22rem;">
        <ds-card [hoverable]="hoverable">
          <p class="mb-0">A minimal card: body content only, no header or footer padding to collapse.</p>
        </ds-card>
      </div>
    `,
  }),
};
