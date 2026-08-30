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
  colorSecondary: '#5d5d5d',
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
  buttonBg: '#111111',
  buttonBorder: '#111111',
  booleanBg: '#111111',
  booleanSelectedBg: '#5d5d5d',
});

addons.setConfig({
  theme: novanTheme,
});