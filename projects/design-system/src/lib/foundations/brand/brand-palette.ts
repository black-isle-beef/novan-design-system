/** A single named color value with its recommended UI usage. */
export interface ColorToken {
  readonly name: string;
  readonly hex: string;
  readonly usage: string;
}

/** A cohesive set of tokens (e.g. all blue shades), lightest first. */
export interface ColorFamily {
  readonly id: string;
  readonly label: string;
  readonly tokens: readonly ColorToken[];
}

/**
 * Modular color palette source of truth. Add a new family or shade here and
 * it automatically appears in the swatch grid, role-assignment dropdowns,
 * and live dashboard demo.
 */
export const BRAND_PALETTE: readonly ColorFamily[] = [
  {
    id: 'base',
    label: 'Base',
    tokens: [
      { name: 'White', hex: '#ffffff', usage: 'Page background and text on dark/brand surfaces.' },
      { name: 'Off-White', hex: '#f5f5f5', usage: 'Muted section backgrounds and card fills.' },
      { name: 'Charcoal', hex: '#333333', usage: 'Primary body text on light surfaces.' },
      { name: 'Black', hex: '#000000', usage: 'Maximum-contrast text and icons, used sparingly.' },
    ],
  },
  {
    id: 'neutral',
    label: 'Neutrals',
    tokens: [
      { name: 'Neutral 900', hex: '#151710', usage: 'Headings and highest-emphasis text.' },
      { name: 'Neutral 700', hex: '#66665f', usage: 'Secondary/muted body text.' },
      { name: 'Neutral 500', hex: '#848c84', usage: 'Placeholder text and disabled states.' },
      { name: 'Neutral 400', hex: '#838484', usage: 'Icon fills on light surfaces.' },
      { name: 'Neutral 300', hex: '#b0b3b5', usage: 'Borders, dividers, and disabled outlines.' },
    ],
  },
  {
    id: 'blue',
    label: 'Blues',
    tokens: [
      { name: 'Blue 500', hex: '#0a2f73', usage: 'Primary brand color: links, key buttons, focus rings.' },
      { name: 'Blue 600', hex: '#082862', usage: 'Hover state for primary buttons and links.' },
      { name: 'Blue 700', hex: '#062150', usage: 'Active/pressed state for primary elements.' },
      { name: 'Blue 800', hex: '#05193f', usage: 'Dark-mode surfaces and page headers.' },
      { name: 'Blue 900', hex: '#03122e', usage: 'Deepest brand shade for high-contrast backgrounds.' },
    ],
  },
  {
    id: 'purple',
    label: 'Purples',
    tokens: [
      { name: 'Purple 500', hex: '#2f1778', usage: 'Secondary brand accent: secondary buttons, active tags.' },
      { name: 'Purple 600', hex: '#22114a', usage: 'Hover state for secondary elements.' },
      { name: 'Purple 700', hex: '#1a0b40', usage: 'Active/pressed state for secondary elements.' },
      { name: 'Purple 800', hex: '#160a34', usage: 'Dark-mode secondary surfaces.' },
      { name: 'Purple 900', hex: '#0f0626', usage: 'Deepest secondary shade for dense dark UI.' },
    ],
  },
  {
    id: 'green',
    label: 'Greens (Success)',
    tokens: [
      { name: 'Mint 100', hex: '#d8f3e2', usage: 'Success alert and banner backgrounds.' },
      { name: 'Green 400', hex: '#57b788', usage: 'Success icon fills and badge backgrounds.' },
      { name: 'Green 600', hex: '#2f9160', usage: 'Default success accent: buttons, success text on white.' },
      { name: 'Green 800', hex: '#1c6b42', usage: 'Success text on light backgrounds, hover state.' },
      { name: 'Forest 900', hex: '#0f4429', usage: 'Dark-mode success surfaces, active state.' },
    ],
  },
  {
    id: 'yellow',
    label: 'Yellows (Warning)',
    tokens: [
      { name: 'Amber 100', hex: '#fdf0d0', usage: 'Warning alert and banner backgrounds.' },
      { name: 'Gold 400', hex: '#f0b429', usage: 'Warning icon fills and badge backgrounds.' },
      { name: 'Amber 600', hex: '#d99a06', usage: 'Default warning accent: buttons, warning text on white.' },
      { name: 'Amber 800', hex: '#9c6b02', usage: 'Warning text on light backgrounds, hover state.' },
      { name: 'Deep Yellow 900', hex: '#6b4a01', usage: 'Dark-mode warning surfaces, active state.' },
    ],
  },
  {
    id: 'red',
    label: 'Reds (Error / Danger)',
    tokens: [
      { name: 'Rose 100', hex: '#fbdde0', usage: 'Error alert and banner backgrounds.' },
      { name: 'Crimson 400', hex: '#e0364a', usage: 'Error icon fills and badge backgrounds.' },
      { name: 'Red 600', hex: '#c11f34', usage: 'Default error accent: buttons, error text on white.' },
      { name: 'Red 800', hex: '#8f1526', usage: 'Error text on light backgrounds, hover state.' },
      { name: 'Burgundy 900', hex: '#5c0f19', usage: 'Dark-mode error surfaces, active state.' },
    ],
  },
] as const;

/** Design roles a palette color can be assigned to. */
export type BrandRole = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';

/** One assignable design role, with its default color and rationale. */
export interface RoleDefinition {
  readonly role: BrandRole;
  readonly label: string;
  readonly description: string;
  readonly defaultFamilyId: string;
  readonly defaultTokenIndex: number;
}

/** Standard defaults applied when the user skips the assignment step. */
export const ROLE_DEFINITIONS: readonly RoleDefinition[] = [
  {
    role: 'primary',
    label: 'Primary',
    description: 'Brand core, major buttons, key focus states.',
    defaultFamilyId: 'blue',
    defaultTokenIndex: 0,
  },
  {
    role: 'secondary',
    label: 'Secondary',
    description: 'Supporting elements, secondary buttons, active tags.',
    defaultFamilyId: 'purple',
    defaultTokenIndex: 0,
  },
  {
    role: 'tertiary',
    label: 'Tertiary',
    description: 'Accents, highlights, badges.',
    defaultFamilyId: 'neutral',
    defaultTokenIndex: 0,
  },
  {
    role: 'success',
    label: 'Success',
    description: 'Positive confirmation states.',
    defaultFamilyId: 'green',
    defaultTokenIndex: 2,
  },
  {
    role: 'warning',
    label: 'Warning',
    description: 'Caution states requiring attention.',
    defaultFamilyId: 'yellow',
    defaultTokenIndex: 2,
  },
  {
    role: 'danger',
    label: 'Error / Danger',
    description: 'Destructive actions, error states.',
    defaultFamilyId: 'red',
    defaultTokenIndex: 2,
  },
] as const;
