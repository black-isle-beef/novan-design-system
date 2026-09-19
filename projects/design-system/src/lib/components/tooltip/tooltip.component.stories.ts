import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from '../button';
import { DsTooltipComponent } from './tooltip.component';

const meta: Meta<DsTooltipComponent> = {
  title: 'Components/Overlay/Tooltip',
  component: DsTooltipComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Short description shown on hover and focus, wired up with role="tooltip" and aria-describedby',
      description: {
        component:
          'Wraps its trigger via content projection and shows `content` on hover *and* focus, so keyboard and touch users get it too — never hover-only. No native element covers this pattern, so it follows the WAI-ARIA tooltip pattern: the popup has `role="tooltip"` and the trigger gets `aria-describedby` pointing at it while open. The popup itself is a native `popover="manual"` element, which — like the modal\'s `<dialog>` — gets top-layer stacking for free, so it is never clipped by an `overflow: hidden` ancestor. `position` is a preference (`top`/`bottom`/`start`/`end`) that flips to the opposite side if it would overflow the viewport. A tooltip should never be the only way to convey essential information.',
      },
    },
  },
  args: {
    content: 'Saves your current draft',
    position: 'top',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<DsTooltipComponent>;

export const Default: Story = {
  render: (args) => ({
    moduleMetadata: { imports: [DsButtonComponent] },
    props: args,
    template: `
      <div style="padding: 6rem; text-align: center;">
        <ds-tooltip [content]="content" [position]="position" [disabled]="disabled">
          <ds-button variant="secondary">Save draft</ds-button>
        </ds-tooltip>
      </div>
    `,
  }),
};

export const Bottom: Story = {
  args: { position: 'bottom' },
  render: Default.render,
};

export const Start: Story = {
  args: { position: 'start' },
  render: Default.render,
};

export const End: Story = {
  args: { position: 'end' },
  render: Default.render,
};

export const OnPlainText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A tooltip can wrap any focusable-or-not trigger — here, underlined text instead of a button.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 6rem; text-align: center;">
        <ds-tooltip [content]="content" [position]="position" [disabled]="disabled">
          <span tabindex="0" style="text-decoration: underline dotted; cursor: help;">Draft</span>
        </ds-tooltip>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: { story: 'With `disabled`, hover and focus never open the tooltip.' },
    },
  },
  render: Default.render,
};
