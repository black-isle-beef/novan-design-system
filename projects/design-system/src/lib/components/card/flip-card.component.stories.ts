import type { Meta, StoryObj } from '@storybook/angular';
import { DsFlipCardComponent } from './flip-card.component';

const meta: Meta<DsFlipCardComponent> = {
  title: 'Components/Content/Flip Card',
  component: DsFlipCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Full-bleed image card that flips on its vertical axis to reveal content on the reverse',
      description: {
        component:
          'A full-bleed image with a heading overlay and a small icon marking it as interactive. The whole card is a native `<button>`, so it\'s focusable and keyboard-activatable (Enter/Space) for free. Hovering with a mouse flips it via CSS alone; a click — which also fires for keyboard/touch activation — toggles a persisted flipped state, so keyboard and touch users (who can\'t "hover") can flip it open and keep it open. `aria-expanded` reports the state, and each face is `aria-hidden` while it isn\'t the one showing. Set `mediaTone` to `\'light\'` for a bright image (dark heading) or leave it at the default `\'dark\'` for a moody one (white heading).',
      },
    },
  },
  args: {
    heading: 'Deep sky imaging',
    mediaTone: 'dark',
  },
};

export default meta;
type Story = StoryObj<DsFlipCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-inline-size: 18rem; block-size: 22rem;">
        <ds-flip-card [heading]="heading" [mediaTone]="mediaTone">
          <img dsFlipCardMedia src="/card-example-nebula.jpg" alt="A star-forming nebula, glowing red and pink against a starfield." />
          <p class="mb-0">A weekend project: 4 hours of stacked exposures on a narrowband rig, processed in three sessions.</p>
        </ds-flip-card>
      </div>
    `,
  }),
};

export const LightMedia: Story = {
  args: { heading: 'Warm glass study', mediaTone: 'light' },
  parameters: {
    docs: {
      description: {
        story: '`mediaTone="light"` switches the heading to a dark color for legibility over a bright image.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-inline-size: 18rem; block-size: 22rem;">
        <ds-flip-card [heading]="heading" [mediaTone]="mediaTone">
          <img dsFlipCardMedia src="/card-example-amber-glass.jpg" alt="Amber-toned abstract render of curved glass surfaces." />
          <p class="mb-0">A material study exploring warm light through layered translucent surfaces.</p>
        </ds-flip-card>
      </div>
    `,
  }),
};
