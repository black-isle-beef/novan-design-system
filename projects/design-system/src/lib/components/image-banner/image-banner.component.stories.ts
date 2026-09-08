import type { Meta, StoryObj } from '@storybook/angular';
import { DsImageBannerComponent } from './image-banner.component';

const meta: Meta<DsImageBannerComponent> = {
  title: 'Components/Global/Image Banner',
  component: DsImageBannerComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'Side-by-side image and text panel',
      description: {
        component:
          'A content banner with two layouts. `split` (default) puts an image on one side and a text panel on the other, each filling half of whatever width the component is placed in, separated by a gutter. `image` drops the panel: the image goes full width with a projected `[dsImageBannerCta]` overlaid and placed by `ctaPosition` (`start` / `center` / `end`). Unlike `ds-hero`, the split layout keeps the copy beside the image rather than on top of it. `imagePosition` sets the image side (split) or mirrors the `sweep` corner (image). `rounded` toggles corner shaping and `cornerStyle` chooses `pill` (semicircular caps) or `sweep` (one large 15rem corner, direction mirrored by `imagePosition`).',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'inline-radio',
      options: ['split', 'image'],
    },
    imagePosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
    rounded: { control: 'boolean' },
    cornerStyle: {
      control: 'inline-radio',
      options: ['pill', 'sweep'],
    },
    ctaPosition: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
    },
  },
  args: {
    imageSrc: '/hero-banner-example.jpg',
    imageAlt: '',
    layout: 'split',
    imagePosition: 'left',
    heading: 'Built for teams that ship',
    rounded: true,
    cornerStyle: 'pill',
    ctaPosition: 'center',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-image-banner
        [imageSrc]="imageSrc"
        [imageAlt]="imageAlt"
        [layout]="layout"
        [imagePosition]="imagePosition"
        [heading]="heading"
        [rounded]="rounded"
        [cornerStyle]="cornerStyle"
        [ctaPosition]="ctaPosition"
      >
        <p>A token-driven Angular + Bootstrap design system for consistent, accessible products. Pair a supporting image with a block of copy without hiding the text behind the photo.</p>
        <a dsImageBannerCta class="btn btn-lg btn-hero-light" href="#">Get started</a>
      </ds-image-banner>
    `,
  }),
};

export default meta;
type Story = StoryObj<DsImageBannerComponent>;

/** Image on the left rounds its right edge; the text panel rounds its left edge. */
export const ImageLeft: Story = {};

/** Image on the right — the corner radii mirror the `ImageLeft` story. */
export const ImageRight: Story = {
  args: { imagePosition: 'right' },
};

/**
 * `cornerStyle="sweep"`: one 15rem corner on each panel — bottom-inner on the
 * left-hand panel, top-inner on the right-hand one — for a diagonal sweep
 * across the gutter instead of the symmetrical pill caps.
 */
export const Sweep: Story = {
  args: { cornerStyle: 'sweep' },
};

/** `sweep` with the image on the right — the large corners swap panels. */
export const SweepImageRight: Story = {
  args: { cornerStyle: 'sweep', imagePosition: 'right' },
};

/** `rounded="false"` squares off every corner on both panels. */
export const SquareCorners: Story = {
  args: { rounded: false },
};

/** Without a `heading` the `<section>` stays an unlabeled group and only the projected copy renders. */
export const NoHeading: Story = {
  args: { heading: undefined },
};

export const LongContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-image-banner
        [imageSrc]="imageSrc"
        [imageAlt]="imageAlt"
        [layout]="layout"
        [imagePosition]="imagePosition"
        [heading]="heading"
        [rounded]="rounded"
        [cornerStyle]="cornerStyle"
        [ctaPosition]="ctaPosition"
      >
        <p>A token-driven Angular + Bootstrap design system for consistent, accessible products.</p>
        <p>Every colour, space, and type value comes from a single set of design tokens, so a change to a token flows through every component and template at once.</p>
        <p>The image and the copy split the available width evenly on wider viewports and stack, image first, on narrow screens.</p>
        <a dsImageBannerCta class="btn btn-lg btn-hero-light" href="#">Get started</a>
      </ds-image-banner>
    `,
  }),
};

/** A described image: `imageAlt` is announced by assistive technology instead of being skipped. */
export const DescriptiveImage: Story = {
  args: { imageAlt: 'A team collaborating around a laptop at a shared desk' },
};

/**
 * `layout="image"`: no text panel — the image fills the width, pill-shaped
 * (both short ends semicircular), with the projected CTA overlaid and centred.
 */
export const ImageOnlyPill: Story = {
  args: { layout: 'image', cornerStyle: 'pill', ctaPosition: 'center' },
};

/**
 * `layout="image"` + `cornerStyle="sweep"`: one large corner top-left and
 * bottom-right, with the CTA pulled to the start (left) edge.
 */
export const ImageOnlySweep: Story = {
  args: { layout: 'image', cornerStyle: 'sweep', imagePosition: 'left', ctaPosition: 'start' },
};

/**
 * `layout="image"` + `cornerStyle="sweep"` + `imagePosition="right"`: the
 * "sweep right" mirror — large corner top-right and bottom-left, CTA at the end.
 */
export const ImageOnlySweepRight: Story = {
  args: { layout: 'image', cornerStyle: 'sweep', imagePosition: 'right', ctaPosition: 'end' },
};
