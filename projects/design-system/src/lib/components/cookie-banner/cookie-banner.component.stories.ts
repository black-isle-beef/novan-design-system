import type { Meta, StoryObj } from '@storybook/angular';
import { DsCookieBannerComponent } from './cookie-banner.component';

const meta: Meta<DsCookieBannerComponent> = {
  title: 'Layout/CookieBanner',
  component: DsCookieBannerComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsCookieBannerComponent>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: 'This site uses strictly necessary cookies only. No tracking, ever.',
  },
};
