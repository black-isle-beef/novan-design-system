import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsAlertComponent } from '../../components/alert';
import { DsBadgeComponent } from '../../components/badge';
import { DsButtonComponent } from '../../components/button';
import { DsCookieBannerComponent } from '../../components/cookie-banner/cookie-banner.component';
import { DsHeaderComponent } from '../../components/header/header.component';
import { DsModalComponent } from '../../components/modal';
import { DsProgressComponent } from '../../components/progress';
import { DsSidebarComponent } from '../../components/sidebar/sidebar.component';
import { DsToastComponent } from '../../components/toast';
import type { NavItem, SidebarItem } from '../../models/nav-item.model';

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'bi bi-house', active: true },
  { label: 'Pages', href: '/pages', icon: 'bi bi-file-earmark-richtext' },
  { label: 'Media', href: '/media', icon: 'bi bi-images' },
  { label: 'Settings', href: '/settings', icon: 'bi bi-gear' },
];

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'bi bi-house', active: true },
  { label: 'Pages', href: '/pages', icon: 'bi bi-file-earmark-richtext' },
  { label: 'Media', href: '/media', icon: 'bi bi-images' },
  { label: 'Settings', href: '/settings', icon: 'bi bi-gear' },
];

/**
 * Every story here renders with `data-bs-theme="dark" data-ds-theme="copper"`
 * on <html> (see the `dsTheme` parameter in .storybook/preview.ts), the same
 * way an app opts in.
 */
const meta: Meta = {
  title: 'Themes/Charcoal & Copper',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        DsAlertComponent,
        DsBadgeComponent,
        DsButtonComponent,
        DsCookieBannerComponent,
        DsHeaderComponent,
        DsModalComponent,
        DsProgressComponent,
        DsSidebarComponent,
        DsToastComponent,
      ],
    }),
  ],
  parameters: {
    dsTheme: 'copper',
    docs: {
      subtitle: 'A dark, warm app theme: charcoal surfaces, brushed copper on primary actions, solid copper on links and focus',
      description: {
        component:
          'Opt in with `<html data-bs-theme="dark" data-ds-theme="copper">`. Bootstrap\'s dark component variables apply first and the theme refines them. Text on copper is always Charcoal 950; solid copper text is only for the canvas and surface, never the raised surface; form-control borders use Neutral 400; danger text uses Rose 100. Under `prefers-contrast: more` and forced colours, primary buttons and progress fall back to solid copper with a visible border.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Header: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    props: { navItems },
    template: `
      <ds-header variant="app" [navItems]="navItems">
        <strong dsBrand>Novan&nbsp;CMS</strong>
        <ng-container dsActions>
          <button type="button" class="btn btn-secondary btn-sm">
            <i class="bi bi-search me-1" aria-hidden="true"></i>Search
          </button>
          <button type="button" class="btn btn-secondary btn-sm rounded-circle" aria-label="Account menu">AB</button>
        </ng-container>
      </ds-header>
      <main id="ds-main-content" class="p-4">
        <h1 class="h3">Dashboard</h1>
        <p>Page content goes here, with an <a href="#copper">inline link</a> in solid copper.</p>
      </main>
    `,
  }),
};

export const CookieBanner: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    // A transform gives the fixed banner a containing block, so it stays visible on the Docs page.
    template: `
      <div style="position: relative; min-height: 160px; transform: translateZ(0);">
        <ds-cookie-banner
          [autoFocus]="false"
          acceptLabel="Accept all"
          declineLabel="Reject all"
          manageLabel="Manage preferences"
          [equalProminence]="true"
        >
          We use strictly necessary cookies to run this site. Read our <a href="#cookies">cookie policy</a>.
        </ds-cookie-banner>
      </div>
    `,
  }),
};

export const Buttons: Story = {
  render: () => ({
    template: `
      <div class="d-flex flex-wrap align-items-center gap-3">
        <ds-button variant="primary">Publish</ds-button>
        <ds-button variant="secondary">Save draft</ds-button>
        <button type="button" class="btn btn-outline-primary">Outline</button>
        <button type="button" class="btn btn-link">Link button</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <ds-button variant="primary" [disabled]="true">Disabled</ds-button>
      </div>
    `,
  }),
};

export const FormControls: Story = {
  render: () => ({
    template: `
      <form class="d-grid gap-3" style="max-inline-size: 28rem">
        <div>
          <label class="form-label" for="copper-title">Page title</label>
          <input class="form-control" id="copper-title" placeholder="For example, Opening hours" />
        </div>
        <div>
          <label class="form-label" for="copper-status">Status</label>
          <select class="form-select" id="copper-status">
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>
        <div>
          <label class="form-label" for="copper-slug">Address</label>
          <input class="form-control is-invalid" id="copper-slug" value="Opening Hours" aria-describedby="copper-slug-error" />
          <div class="invalid-feedback" id="copper-slug-error">Use lower-case letters and dashes only.</div>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="copper-check" checked />
          <label class="form-check-label" for="copper-check">Show in the menu</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="copper-radio" id="copper-radio-a" checked />
          <label class="form-check-label" for="copper-radio-a">Everyone</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="copper-radio" id="copper-radio-b" />
          <label class="form-check-label" for="copper-radio-b">Signed-in people only</label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="copper-switch" checked />
          <label class="form-check-label" for="copper-switch">Send me a copy</label>
        </div>
      </form>
    `,
  }),
};

export const Alert: Story = {
  render: () => ({
    template: `
      <div class="d-grid gap-3">
        <ds-alert variant="info" title="This site has no address yet">Set it in Space settings.</ds-alert>
        <ds-alert variant="success" title="Published">Your changes are live.</ds-alert>
        <ds-alert variant="warning" title="Someone else is editing">You can look, but not change anything yet.</ds-alert>
        <ds-alert variant="danger" title="Could not save">Check your connection and try again.</ds-alert>
      </div>
    `,
  }),
};

export const Badge: Story = {
  render: () => ({
    template: `
      <div class="d-flex flex-wrap gap-2">
        <ds-badge variant="primary">Primary</ds-badge>
        <ds-badge variant="secondary">Secondary</ds-badge>
        <ds-badge variant="success">Live</ds-badge>
        <ds-badge variant="warning">Draft</ds-badge>
        <ds-badge variant="danger">Failed</ds-badge>
        <ds-badge variant="info">Scheduled</ds-badge>
        <ds-badge variant="neutral">Hidden</ds-badge>
      </div>
    `,
  }),
};

export const Progress: Story = {
  render: () => ({
    template: `
      <div class="d-grid gap-3">
        <ds-progress [value]="2" [max]="4" label="Getting started" />
        <ds-progress [value]="65" label="Uploading photo.jpg" [showValueText]="true" />
        <ds-progress [value]="100" variant="success" label="Upload complete" />
      </div>
    `,
  }),
};

export const Toast: Story = {
  render: () => ({
    template: `
      <div class="d-grid gap-3" style="max-inline-size: 24rem">
        <ds-toast variant="success" title="Saved">Your changes have been saved.</ds-toast>
        <ds-toast variant="danger" title="Could not publish">Try again in a moment.</ds-toast>
      </div>
    `,
  }),
};

export const Modal: Story = {
  render: () => ({
    template: `
      <ds-modal [open]="true" heading="Dismiss the checklist?">
        <p>It is hidden for everyone in this space, and does not come back.</p>
        <ds-button dsModalFooter variant="secondary">Cancel</ds-button>
        <ds-button dsModalFooter variant="primary">Dismiss checklist</ds-button>
      </ds-modal>
    `,
  }),
};

export const Sidebar: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    props: { items: sidebarItems },
    template: `
      <div class="d-flex" style="block-size: 640px">
        <ds-sidebar [items]="items" ariaLabel="Space" />
        <main class="p-4"><h1 class="h3">Dashboard</h1></main>
      </div>
    `,
  }),
};
