/** One loadable Montserrat weight, with its numeric value and the CSS needed to select it. */
export interface FontWeightToken {
  readonly value: number;
  readonly name: string;
  readonly cssRule: string;
}

/** All nine static Montserrat weights, Thin through Black. */
export const FONT_WEIGHTS: readonly FontWeightToken[] = [
  { value: 100, name: 'Thin', cssRule: 'font-weight: 100;' },
  { value: 200, name: 'ExtraLight', cssRule: 'font-weight: 200;' },
  { value: 300, name: 'Light', cssRule: 'font-weight: 300;' },
  { value: 400, name: 'Regular', cssRule: 'font-weight: 400;' },
  { value: 500, name: 'Medium', cssRule: 'font-weight: 500;' },
  { value: 600, name: 'SemiBold', cssRule: 'font-weight: 600;' },
  { value: 700, name: 'Bold', cssRule: 'font-weight: 700;' },
  { value: 800, name: 'ExtraBold', cssRule: 'font-weight: 800;' },
  { value: 900, name: 'Black', cssRule: 'font-weight: 900;' },
] as const;

/** Proportional scale entry for one heading level. */
export interface HeadingScaleToken {
  readonly level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  readonly sizeRem: number;
  readonly lineHeight: number;
  readonly letterSpacing: string;
  readonly weight: number;
}

/** h1-h6 proportional type scale: size shrinks, tracking loosens, weight eases as level increases. */
export const HEADING_SCALE: readonly HeadingScaleToken[] = [
  { level: 'h1', sizeRem: 3, lineHeight: 1.15, letterSpacing: '-0.02em', weight: 700 },
  { level: 'h2', sizeRem: 2.5, lineHeight: 1.2, letterSpacing: '-0.015em', weight: 700 },
  { level: 'h3', sizeRem: 2, lineHeight: 1.25, letterSpacing: '-0.01em', weight: 600 },
  { level: 'h4', sizeRem: 1.5, lineHeight: 1.3, letterSpacing: '-0.005em', weight: 600 },
  { level: 'h5', sizeRem: 1.25, lineHeight: 1.4, letterSpacing: '0', weight: 600 },
  { level: 'h6', sizeRem: 1, lineHeight: 1.4, letterSpacing: '0.02em', weight: 600 },
] as const;

/** Sample sentence used throughout the weight grid and playground. */
export const PANGRAM = 'The quick brown fox jumps over the lazy dog';

/** Sticky side-drawer navigation targets. */
export interface TypographyNavSection {
  readonly id: string;
  readonly label: string;
}

export const NAV_SECTIONS: readonly TypographyNavSection[] = [
  { id: 'headings', label: 'Headings' },
  { id: 'body', label: 'Body & Inline Text' },
  { id: 'hyperlinks', label: 'Hyperlinks' },
  { id: 'weight-grid', label: 'Weight Grid' },
  { id: 'playground', label: 'Playground' },
] as const;
