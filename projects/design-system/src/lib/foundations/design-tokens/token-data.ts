/** Top-level grouping used for section navigation, filter chips, and code export buckets. */
export type TokenCategory = 'color' | 'typography' | 'spacing' | 'elevation' | 'radius' | 'motion' | 'zindex';

/** How a token's value should be visualized on its card. */
export type TokenPreview = 'swatch' | 'shadow' | 'radius' | 'motion' | 'text' | 'spacing' | 'zindex';

export interface DesignToken {
  /** e.g. `--color-bg-primary`. */
  readonly cssVar: string;
  /** e.g. `$color-bg-primary`. */
  readonly scssVar: string;
  readonly category: TokenCategory;
  /** Sub-heading within a category, e.g. "Raw palette" vs "Semantic". */
  readonly group: string;
  readonly value: string;
  /** Present only for semantic color tokens that recalculate under dark mode. */
  readonly darkValue?: string;
  readonly usage: string;
  readonly preview: TokenPreview;
  /** Short slug used as the entry key in the JSON/Sass-map exports, e.g. `gray-50` or `bg-primary`. */
  readonly key: string;
}

export interface CategoryDef {
  readonly id: TokenCategory | 'all';
  readonly label: string;
}

export const CATEGORY_DEFS: readonly CategoryDef[] = [
  { id: 'all', label: 'All' },
  { id: 'color', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'elevation', label: 'Shadows' },
  { id: 'radius', label: 'Radius' },
  { id: 'motion', label: 'Motion' },
  { id: 'zindex', label: 'Z-Index' },
];

import { BRAND_PALETTE, ROLE_DEFINITIONS } from '../brand/brand-palette';

/** kebab-case slug of a brand-palette token name, e.g. "Blue 500" -> "blue-500". */
function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function rawColorTokens(): DesignToken[] {
  return BRAND_PALETTE.flatMap((family) =>
    family.tokens.map((token) => {
      const key = slug(token.name);
      return {
        cssVar: `--color-${key}`,
        scssVar: `$color-${key}`,
        category: 'color',
        group: family.label,
        value: token.hex,
        usage: token.usage,
        preview: 'swatch',
        key,
      } satisfies DesignToken;
    }),
  );
}

const familiesById = new Map(BRAND_PALETTE.map((family) => [family.id, family]));
const rolesByRole = new Map(ROLE_DEFINITIONS.map((def) => [def.role, def]));

/** Resolves a role's default brand color, offset by `delta` shades within the same family (clamped). */
function roleShade(role: (typeof ROLE_DEFINITIONS)[number]['role'], delta = 0): string {
  const def = rolesByRole.get(role)!;
  const family = familiesById.get(def.defaultFamilyId)!;
  const index = Math.min(Math.max(def.defaultTokenIndex + delta, 0), family.tokens.length - 1);
  return family.tokens[index].hex;
}

/**
 * Semantic aliases built directly on top of the brand palette (`../brand/brand-palette.ts`) so
 * this page always matches Foundations/Brand — light values come from the "Base"/"Neutrals"
 * families and the default primary role; dark values reuse the same dark-theme colors already
 * established by the Typography foundation page's dark-mode toggle.
 */
const SEMANTIC_COLOR_TOKENS: DesignToken[] = [
  {
    cssVar: '--color-bg-primary',
    scssVar: '$color-bg-primary',
    category: 'color',
    group: 'Semantic',
    value: '#ffffff',
    darkValue: '#151710',
    usage: 'Default page/body background.',
    preview: 'swatch',
    key: 'bg-primary',
  },
  {
    cssVar: '--color-bg-secondary',
    scssVar: '$color-bg-secondary',
    category: 'color',
    group: 'Semantic',
    value: '#f5f5f5',
    darkValue: '#22241d',
    usage: 'Card and panel surfaces raised above the page background.',
    preview: 'swatch',
    key: 'bg-secondary',
  },
  {
    cssVar: '--color-text-primary',
    scssVar: '$color-text-primary',
    category: 'color',
    group: 'Semantic',
    value: '#151710',
    darkValue: '#f5f5f5',
    usage: 'Default body and heading text color.',
    preview: 'swatch',
    key: 'text-primary',
  },
  {
    cssVar: '--color-text-muted',
    scssVar: '$color-text-muted',
    category: 'color',
    group: 'Semantic',
    value: '#66665f',
    darkValue: '#b0b3b5',
    usage: 'De-emphasized secondary/supporting text.',
    preview: 'swatch',
    key: 'text-muted',
  },
  {
    cssVar: '--color-border-subtle',
    scssVar: '$color-border-subtle',
    category: 'color',
    group: 'Semantic',
    value: '#b0b3b5',
    darkValue: '#4a4d45',
    usage: 'Dividers, card outlines, and low-emphasis borders.',
    preview: 'swatch',
    key: 'border-subtle',
  },
  {
    cssVar: '--color-interactive-primary',
    scssVar: '$color-interactive-primary',
    category: 'color',
    group: 'Semantic',
    value: roleShade('primary'),
    darkValue: '#7fa3ff',
    usage: 'Default state for links, primary buttons, and focus rings — the brand "Primary" role.',
    preview: 'swatch',
    key: 'interactive-primary',
  },
  {
    cssVar: '--color-interactive-hover',
    scssVar: '$color-interactive-hover',
    category: 'color',
    group: 'Semantic',
    value: roleShade('primary', 1),
    darkValue: '#a8c1ff',
    usage: 'Hover/active state for interactive elements — one shade deeper than the "Primary" role.',
    preview: 'swatch',
    key: 'interactive-hover',
  },
];

const FONT_SIZE_STEPS: readonly [string, string][] = [
  ['xs', '12px'],
  ['sm', '14px'],
  ['base', '16px'],
  ['lg', '18px'],
  ['xl', '20px'],
  ['2xl', '24px'],
  ['3xl', '30px'],
  ['4xl', '36px'],
];

const TYPOGRAPHY_TOKENS: DesignToken[] = [
  {
    cssVar: '--font-family-sans',
    scssVar: '$font-family-sans',
    category: 'typography',
    group: 'Font family',
    value: "'Montserrat', system-ui, -apple-system, sans-serif",
    usage: 'Body copy and UI controls — self-hosted static Montserrat weights (Thin-Black).',
    preview: 'text',
    key: 'sans',
  },
  {
    cssVar: '--font-family-heading',
    scssVar: '$font-family-heading',
    category: 'typography',
    group: 'Font family',
    value: "'Montserrat Variable', 'Montserrat', system-ui, -apple-system, sans-serif",
    usage: 'Headings (h1-h6) — variable-font Montserrat, weight axis 100-900.',
    preview: 'text',
    key: 'heading',
  },
  {
    cssVar: '--font-family-mono',
    scssVar: '$font-family-mono',
    category: 'typography',
    group: 'Font family',
    value: "'SFMono-Regular', Menlo, Consolas, monospace",
    usage: 'Code samples and token values.',
    preview: 'text',
    key: 'mono',
  },
  ...FONT_SIZE_STEPS.map(
    ([step, px]): DesignToken => ({
      cssVar: `--font-size-${step}`,
      scssVar: `$font-size-${step}`,
      category: 'typography',
      group: 'Font size',
      value: px,
      usage: `Type scale step "${step}".`,
      preview: 'text',
      key: step,
    }),
  ),
  {
    cssVar: '--leading-tight',
    scssVar: '$leading-tight',
    category: 'typography',
    group: 'Line height',
    value: '1.2',
    usage: 'Headings and dense single-line UI text.',
    preview: 'text',
    key: 'tight',
  },
  {
    cssVar: '--leading-normal',
    scssVar: '$leading-normal',
    category: 'typography',
    group: 'Line height',
    value: '1.5',
    usage: 'Default body copy line height.',
    preview: 'text',
    key: 'normal',
  },
  {
    cssVar: '--leading-loose',
    scssVar: '$leading-loose',
    category: 'typography',
    group: 'Line height',
    value: '1.75',
    usage: 'Long-form reading content.',
    preview: 'text',
    key: 'loose',
  },
  {
    cssVar: '--tracking-tight',
    scssVar: '$tracking-tight',
    category: 'typography',
    group: 'Letter spacing',
    value: '-0.02em',
    usage: 'Large display headings.',
    preview: 'text',
    key: 'tight',
  },
  {
    cssVar: '--tracking-normal',
    scssVar: '$tracking-normal',
    category: 'typography',
    group: 'Letter spacing',
    value: '0em',
    usage: 'Default body copy.',
    preview: 'text',
    key: 'normal',
  },
  {
    cssVar: '--tracking-wide',
    scssVar: '$tracking-wide',
    category: 'typography',
    group: 'Letter spacing',
    value: '0.05em',
    usage: 'All-caps labels and eyebrow text.',
    preview: 'text',
    key: 'wide',
  },
];

/** `--space-1` (4px) through `--space-24` (96px) on a 4px/8px rhythm. */
const SPACING_TOKENS: DesignToken[] = Array.from({ length: 24 }, (_, i) => {
  const step = i + 1;
  const px = step * 4;
  return {
    cssVar: `--space-${step}`,
    scssVar: `$space-${step}`,
    category: 'spacing',
    group: 'Scale',
    value: `${px}px`,
    usage: `Spacing step ${step} — ${px}px.`,
    preview: 'spacing',
    key: `${step}`,
  } as DesignToken;
});

const ELEVATION_TOKENS: DesignToken[] = [
  {
    cssVar: '--elevation-flat',
    scssVar: '$elevation-flat',
    category: 'elevation',
    group: 'Elevation',
    value: 'none',
    usage: 'Flush elements with no shadow, e.g. inline chips.',
    preview: 'shadow',
    key: 'flat',
  },
  {
    cssVar: '--elevation-low',
    scssVar: '$elevation-low',
    category: 'elevation',
    group: 'Elevation',
    value: '0 1px 2px rgba(17, 24, 39, 0.06), 0 1px 3px rgba(17, 24, 39, 0.10)',
    usage: 'Cards and list rows resting on the page.',
    preview: 'shadow',
    key: 'low',
  },
  {
    cssVar: '--elevation-medium',
    scssVar: '$elevation-medium',
    category: 'elevation',
    group: 'Elevation',
    value: '0 4px 6px rgba(17, 24, 39, 0.07), 0 10px 15px rgba(17, 24, 39, 0.10)',
    usage: 'Dropdowns, popovers, and hover-raised cards.',
    preview: 'shadow',
    key: 'medium',
  },
  {
    cssVar: '--elevation-high',
    scssVar: '$elevation-high',
    category: 'elevation',
    group: 'Elevation',
    value: '0 10px 15px rgba(17, 24, 39, 0.10), 0 20px 40px rgba(17, 24, 39, 0.15)',
    usage: 'Modals, dialogs, and other top-of-stack surfaces.',
    preview: 'shadow',
    key: 'high',
  },
];

const RADIUS_TOKENS: DesignToken[] = [
  {
    cssVar: '--radius-none',
    scssVar: '$radius-none',
    category: 'radius',
    group: 'Radius',
    value: '0px',
    usage: 'Square-cornered elements, e.g. table cells.',
    preview: 'radius',
    key: 'none',
  },
  {
    cssVar: '--radius-sm',
    scssVar: '$radius-sm',
    category: 'radius',
    group: 'Radius',
    value: '4px',
    usage: 'Inputs, badges, and small controls.',
    preview: 'radius',
    key: 'sm',
  },
  {
    cssVar: '--radius-md',
    scssVar: '$radius-md',
    category: 'radius',
    group: 'Radius',
    value: '8px',
    usage: 'Buttons and cards.',
    preview: 'radius',
    key: 'md',
  },
  {
    cssVar: '--radius-lg',
    scssVar: '$radius-lg',
    category: 'radius',
    group: 'Radius',
    value: '16px',
    usage: 'Large panels and modals.',
    preview: 'radius',
    key: 'lg',
  },
  {
    cssVar: '--radius-full',
    scssVar: '$radius-full',
    category: 'radius',
    group: 'Radius',
    value: '9999px',
    usage: 'Pills, avatars, and fully-rounded controls.',
    preview: 'radius',
    key: 'full',
  },
];

const MOTION_TOKENS: DesignToken[] = [
  {
    cssVar: '--duration-fast',
    scssVar: '$duration-fast',
    category: 'motion',
    group: 'Duration',
    value: '150ms',
    usage: 'Micro-interactions: hover, focus, toggles.',
    preview: 'motion',
    key: 'fast',
  },
  {
    cssVar: '--duration-normal',
    scssVar: '$duration-normal',
    category: 'motion',
    group: 'Duration',
    value: '300ms',
    usage: 'Standard transitions: dropdowns, tab switches.',
    preview: 'motion',
    key: 'normal',
  },
  {
    cssVar: '--duration-slow',
    scssVar: '$duration-slow',
    category: 'motion',
    group: 'Duration',
    value: '450ms',
    usage: 'Larger surface transitions: modals, page sections.',
    preview: 'motion',
    key: 'slow',
  },
  {
    cssVar: '--ease-in-out',
    scssVar: '$ease-in-out',
    category: 'motion',
    group: 'Easing',
    value: 'cubic-bezier(0.4, 0, 0.2, 1)',
    usage: 'Default easing for most transitions.',
    preview: 'motion',
    key: 'in-out',
  },
  {
    cssVar: '--ease-bounce',
    scssVar: '$ease-bounce',
    category: 'motion',
    group: 'Easing',
    value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    usage: 'Playful emphasis, e.g. success confirmations.',
    preview: 'motion',
    key: 'bounce',
  },
];

const Z_INDEX_TOKENS: DesignToken[] = [
  {
    cssVar: '--z-base',
    scssVar: '$z-base',
    category: 'zindex',
    group: 'Stacking order',
    value: '0',
    usage: 'Default document flow.',
    preview: 'zindex',
    key: 'base',
  },
  {
    cssVar: '--z-dropdown',
    scssVar: '$z-dropdown',
    category: 'zindex',
    group: 'Stacking order',
    value: '1000',
    usage: 'Dropdown menus and select panels.',
    preview: 'zindex',
    key: 'dropdown',
  },
  {
    cssVar: '--z-sticky',
    scssVar: '$z-sticky',
    category: 'zindex',
    group: 'Stacking order',
    value: '1100',
    usage: 'Sticky headers and toolbars.',
    preview: 'zindex',
    key: 'sticky',
  },
  {
    cssVar: '--z-modal',
    scssVar: '$z-modal',
    category: 'zindex',
    group: 'Stacking order',
    value: '1300',
    usage: 'Modal dialogs and their backdrops.',
    preview: 'zindex',
    key: 'modal',
  },
  {
    cssVar: '--z-toast',
    scssVar: '$z-toast',
    category: 'zindex',
    group: 'Stacking order',
    value: '1500',
    usage: 'Toasts and notifications, above everything else.',
    preview: 'zindex',
    key: 'toast',
  },
];

/** Full token tree: raw palettes, semantic aliases, and every other category. Single source of truth for the explorer, theme preview, and all four code-export formats. */
export const DESIGN_TOKENS: readonly DesignToken[] = [
  ...rawColorTokens(),
  ...SEMANTIC_COLOR_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...SPACING_TOKENS,
  ...ELEVATION_TOKENS,
  ...RADIUS_TOKENS,
  ...MOTION_TOKENS,
  ...Z_INDEX_TOKENS,
];
