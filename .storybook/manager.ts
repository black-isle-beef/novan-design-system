import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

declare global {
  interface Window {
    /** Set by `managerHead` in main.ts from the newest CHANGELOG.md release. */
    __NOVAN_DS_VERSION__?: string;
  }
}

const version = window.__NOVAN_DS_VERSION__;

// With no `brandImage`, Storybook renders `brandTitle` as HTML inside the
// sidebar's home link, which lets the version pill sit beside the logo.
// Styles live in manager-head.html.
const brandTitle = [
  '<span class="ds-sb-brand">',
  '<img class="ds-sb-brand__mark" src="/logos/marks/compass-mark-charcoal.svg" alt="">',
  '<span class="ds-sb-brand__name">novan</span>',
  version ? `<span class="ds-sb-brand__version">v${version}</span>` : '',
  '</span>',
].join('');

const novanTheme = create({
  base: 'light',
  brandTitle,
  brandUrl: '/',
  brandTarget: '_self',
  fontBase: 'Montserrat Alternates, sans-serif',
  fontCode: 'Montserrat Alternates, monospace',
  colorPrimary: '#111111',
  // `colorSecondary` doubles as the manager's accent AND the text colour for
  // default buttons (Save / Update story bar), links and focus rings, so it
  // must stay legible on a light surface. The old mid-grey (#5d5d5d) was
  // invisible on the dark `buttonBg` below.
  colorSecondary: '#2f1778',
  appBg: '#f5f5f3',
  appContentBg: '#fff',
  appPreviewBg: '#fff',
  appBorderColor: '#d5d5d1',
  appBorderRadius: 2,
  textColor: '#171717',
  textInverseColor: '#fff',
  barTextColor: '#5d5d5d',
  barSelectedColor: '#111111',
  barHoverColor: '#111111',
  inputBg: '#fff',
  inputBorder: '#bababa',
  inputTextColor: '#171717',
  inputBorderRadius: 2,
  // Storybook has no dedicated "button text" token — default buttons paint
  // their label with `colorSecondary`, so the button surface has to be light.
  buttonBg: '#f5f5f3',
  buttonBorder: '#d5d5d1',
  // Boolean toggle: light track so the inactive (dimmed) label reads, white
  // selected pill so the active label's dark text has contrast.
  booleanBg: '#e9e9e6',
  booleanSelectedBg: '#ffffff',
});

addons.setConfig({
  theme: novanTheme,
});