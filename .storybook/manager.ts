import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const novanTheme = create({
  base: 'light',
  brandTitle: 'novan design system',
  brandUrl: '/',
  brandImage: '/Novan%20logos_1.png',
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