import type { Meta, StoryObj } from '@storybook/angular';
import { DsCookieBannerComponent } from './cookie-banner.component';

const meta: Meta<DsCookieBannerComponent> = {
  title: 'Components/Structural/CookieBanner',
  component: DsCookieBannerComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'Accessible cookie-consent banner',
      description: {
        component:
          'Accessible cookie-consent banner. Manages focus (moves focus to the primary action when shown, restores focus to the previously-focused element when dismissed) and emits consent decisions as output events.',
      },
    },
  },
  // The banner is `position: fixed`, so it contributes no height to normal
  // document flow. Storybook's Docs page renders stories inline inside a
  // 0px-tall wrapper, which clips fixed content entirely. Wrapping with a
  // `transform` establishes a new containing block, so `fixed` positions
  // relative to this decorator instead of the real viewport, keeping the
  // banner visible on the Docs page without changing the component itself.
  decorators: [
    (story) => {
      const rendered = story();
      return {
        ...rendered,
        template: `<div style="position: relative; min-height: 160px; transform: translateZ(0);">${rendered.template}</div>`,
      };
    },
  ],
};

export default meta;
type Story = StoryObj<DsCookieBannerComponent>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: 'This site uses strictly necessary cookies only. No tracking, ever.',
  },
};

/**
 * UK/EU-style consent: accept and reject with equal weight, a "Manage
 * preferences" action, a projected message linking to the cookie policy, and
 * no focus move on page load. Bind `[(open)]` to reopen it from a footer link.
 */
export const Consent: Story = {
  render: () => ({
    template: `
      <ds-cookie-banner
        [autoFocus]="false"
        acceptLabel="Accept all"
        declineLabel="Reject all"
        manageLabel="Manage preferences"
        [equalProminence]="true"
      >
        We use strictly necessary cookies to run this site. With your permission we would also use analytics cookies.
        Read our <a href="#cookies" class="link-light">cookie policy</a>.
      </ds-cookie-banner>
    `,
  }),
};
