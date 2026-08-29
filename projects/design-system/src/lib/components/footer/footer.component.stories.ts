import type { Meta, StoryObj } from '@storybook/angular';
import { DsFooterComponent } from './footer.component';
import type { FooterLinkGroup } from '../../models/nav-item.model';

const linkGroups: FooterLinkGroup[] = [
  { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }] },
  { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }] },
  { title: 'Resources', links: [{ label: 'Docs', href: '#' }, { label: 'Support', href: '#' }] },
  { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
];

const meta: Meta<DsFooterComponent> = {
  title: 'Layout/Footer',
  component: DsFooterComponent,
  tags: ['autodocs'],
  args: {
    organizationName: 'Novan Inc.',
    linkGroups,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-footer [organizationName]="organizationName" [linkGroups]="linkGroups">
        <span dsFooterLegal>Registered in Delaware, USA.</span>
      </ds-footer>
    `,
  }),
};

export default meta;
type Story = StoryObj<DsFooterComponent>;

export const Default: Story = {};

export const NoLinkGroups: Story = {
  args: { linkGroups: [] },
};
