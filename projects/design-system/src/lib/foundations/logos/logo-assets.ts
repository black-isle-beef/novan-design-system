/** One full-lockup (mark + "novan web services" wordmark) raster export. */
export interface LogoImageAsset {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly backgroundLabel: string;
  readonly backgroundHex: string;
  readonly usage: string;
}

/** Primary lockup — 1080×1080 square, for desktop headers, hero sections, and print. */
export const PRIMARY_LOCKUPS: readonly LogoImageAsset[] = [
  {
    id: 'primary-charcoal',
    src: '/logos/primary-lockup/primary-lockup-on-charcoal.png',
    alt: 'Novan Web Services primary logo, white mark and wordmark on dark charcoal',
    backgroundLabel: 'Dark charcoal',
    backgroundHex: '#333333',
    usage: 'Dark UI surfaces, footers, and dark-mode hero sections.',
  },
  {
    id: 'primary-black',
    src: '/logos/primary-lockup/primary-lockup-on-black.png',
    alt: 'Novan Web Services primary logo, white mark and wordmark on black',
    backgroundLabel: 'Black',
    backgroundHex: '#000000',
    usage: 'Maximum-contrast dark surfaces: title slides, video intros.',
  },
  {
    id: 'primary-white-1',
    src: '/logos/primary-lockup/primary-lockup-on-white-1.png',
    alt: 'Novan Web Services primary logo, charcoal mark and wordmark on white',
    backgroundLabel: 'White',
    backgroundHex: '#ffffff',
    usage: 'Default light-surface lockup: site headers, documents, print.',
  },
  {
    id: 'primary-white-2',
    src: '/logos/primary-lockup/primary-lockup-on-white-2.png',
    alt: 'Novan Web Services primary logo, charcoal mark and wordmark on white (alternate export)',
    backgroundLabel: 'White (alt export)',
    backgroundHex: '#ffffff',
    usage: 'Alternate export of the light lockup — kept for source-file parity.',
  },
  {
    id: 'primary-white-3',
    src: '/logos/primary-lockup/primary-lockup-on-white-3.png',
    alt: 'Novan Web Services primary logo, charcoal mark and wordmark on white (alternate export)',
    backgroundLabel: 'White (alt export)',
    backgroundHex: '#ffffff',
    usage: 'Alternate export of the light lockup — kept for source-file parity.',
  },
] as const;

/** Compact lockup — 250×100 horizontal, for tablet/mobile headers and tight spaces. */
export const COMPACT_LOCKUPS: readonly LogoImageAsset[] = [
  {
    id: 'compact-white',
    src: '/logos/compact-lockup/compact-lockup-on-white.png',
    alt: 'Novan Web Services compact logo, dark mark and wordmark on white',
    backgroundLabel: 'White',
    backgroundHex: '#333333',
    usage: 'Default compact lockup for light headers on tablet and mobile.',
  },
  {
    id: 'compact-black',
    src: '/logos/compact-lockup/compact-lockup-on-black.png',
    alt: 'Novan Web Services compact logo, white mark and wordmark on black',
    backgroundLabel: 'Black',
    backgroundHex: '#000000',
    usage: 'Dark compact headers and app toolbars.',
  },
  {
    id: 'compact-charcoal-1',
    src: '/logos/compact-lockup/compact-lockup-on-charcoal-1.png',
    alt: 'Novan Web Services compact logo, white mark and wordmark on dark grey',
    backgroundLabel: 'Dark grey',
    backgroundHex: '#3a3a3a',
    usage: 'Dark-grey compact headers.',
  },
  {
    id: 'compact-charcoal-2',
    src: '/logos/compact-lockup/compact-lockup-on-charcoal-2.png',
    alt: 'Novan Web Services compact logo, white mark and wordmark on dark grey (alternate export)',
    backgroundLabel: 'Dark grey (alt export)',
    backgroundHex: '#3a3a3a',
    usage: 'Alternate export of the dark-grey compact lockup.',
  },
] as const;

/** A standalone SVG mark (no wordmark) — scalable, for pairing with live HTML text. */
export interface LogoMark {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly label: string;
  readonly fillHex: string;
  readonly recommendedOn: string;
}

export const ICON_MARKS: readonly LogoMark[] = [
  {
    id: 'mark-charcoal',
    src: '/logos/marks/compass-mark-charcoal.svg',
    alt: 'Novan Web Services compass mark, charcoal fill',
    label: 'Charcoal',
    fillHex: '#333333',
    recommendedOn: 'White and light backgrounds',
  },
  {
    id: 'mark-white',
    src: '/logos/marks/compass-mark-white.svg',
    alt: 'Novan Web Services compass mark, white fill',
    label: 'White',
    fillHex: '#ffffff',
    recommendedOn: 'Black, charcoal, and brand-purple backgrounds',
  },
  {
    id: 'mark-white-outlined',
    src: '/logos/marks/compass-mark-white-outlined.svg',
    alt: 'Novan Web Services compass mark, white fill with outline',
    label: 'White, outlined',
    fillHex: '#ffffff',
    recommendedOn: 'Photos and busy/textured backgrounds, where the outline preserves legibility',
  },
] as const;

/** A background swatch paired with the logo/mark variant that reads best on it. */
export interface BackgroundPairing {
  readonly backgroundLabel: string;
  readonly backgroundHex: string;
  readonly recommendedMarkId: string;
  readonly rationale: string;
}

export const BACKGROUND_PAIRINGS: readonly BackgroundPairing[] = [
  {
    backgroundLabel: 'White',
    backgroundHex: '#ffffff',
    recommendedMarkId: 'mark-charcoal',
    rationale: 'Charcoal mark holds strong contrast against a white surface.',
  },
  {
    backgroundLabel: 'Off-white',
    backgroundHex: '#f5f5f5',
    recommendedMarkId: 'mark-charcoal',
    rationale: 'Charcoal still reads clearly on the muted off-white surface color.',
  },
  {
    backgroundLabel: 'Charcoal',
    backgroundHex: '#333333',
    recommendedMarkId: 'mark-white',
    rationale: 'White mark is the only variant with enough contrast on charcoal.',
  },
  {
    backgroundLabel: 'Black',
    backgroundHex: '#000000',
    recommendedMarkId: 'mark-white',
    rationale: 'Maximum contrast between the white mark and a pure black surface.',
  },
  {
    backgroundLabel: 'Brand purple',
    backgroundHex: '#2f1778',
    recommendedMarkId: 'mark-white',
    rationale: 'White mark stays legible against the brand accent purple; the mark’s own purple accent triangle is dropped visually into the surface, so keep the mark small enough that it remains a mark, not a color clash.',
  },
  {
    backgroundLabel: 'Photo / busy background',
    backgroundHex: '#6b6b6b',
    recommendedMarkId: 'mark-white-outlined',
    rationale: 'The outline keeps the mark legible when the background isn’t a flat color.',
  },
] as const;

/** Preview viewport option for the responsive site-usage toggle. */
export interface LogoViewport {
  readonly id: 'desktop' | 'tablet' | 'mobile';
  readonly label: string;
  readonly width: string;
}

export const LOGO_VIEWPORTS: readonly LogoViewport[] = [
  { id: 'desktop', label: 'Desktop', width: '100%' },
  { id: 'tablet', label: 'Tablet', width: '768px' },
  { id: 'mobile', label: 'Mobile', width: '375px' },
] as const;

/** Copyable HTML/CSS combining a scalable SVG mark with live "novan web services" text. */
export interface WebLockupSnippet {
  readonly markId: string;
  readonly html: string;
  readonly css: string;
}

export const WEB_LOCKUP_SNIPPETS: readonly WebLockupSnippet[] = [
  {
    markId: 'mark-charcoal',
    html: `<a class="brand-lockup" href="/">
  <img class="brand-lockup__mark" src="/logos/marks/compass-mark-charcoal.svg" alt="" />
  <span class="brand-lockup__text">novan web services</span>
</a>`,
    css: `.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 16px);
  text-decoration: none;
}
.brand-lockup__mark { height: 32px; width: 32px; }
.brand-lockup__text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: #333333;
}`,
  },
  {
    markId: 'mark-white',
    html: `<a class="brand-lockup brand-lockup--dark" href="/">
  <img class="brand-lockup__mark" src="/logos/marks/compass-mark-white.svg" alt="" />
  <span class="brand-lockup__text">novan web services</span>
</a>`,
    css: `.brand-lockup--dark {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 16px);
  text-decoration: none;
}
.brand-lockup--dark .brand-lockup__mark { height: 32px; width: 32px; }
.brand-lockup--dark .brand-lockup__text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: #ffffff;
}`,
  },
  {
    markId: 'mark-white-outlined',
    html: `<a class="brand-lockup brand-lockup--on-photo" href="/">
  <img class="brand-lockup__mark" src="/logos/marks/compass-mark-white-outlined.svg" alt="" />
  <span class="brand-lockup__text">novan web services</span>
</a>`,
    css: `.brand-lockup--on-photo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 16px);
  text-decoration: none;
}
.brand-lockup--on-photo .brand-lockup__mark { height: 32px; width: 32px; }
.brand-lockup--on-photo .brand-lockup__text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: #ffffff;
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.45);
}`,
  },
] as const;

/** Sticky side-drawer navigation targets. */
export interface LogoNavSection {
  readonly id: string;
  readonly label: string;
}

export const NAV_SECTIONS: readonly LogoNavSection[] = [
  { id: 'primary-lockup', label: 'Primary Lockup' },
  { id: 'compact-lockup', label: 'Compact Lockup' },
  { id: 'responsive-usage', label: 'Responsive Site Usage' },
  { id: 'background-pairing', label: 'Color & Background Pairing' },
  { id: 'web-lockup', label: 'SVG + Wordmark' },
  { id: 'guidelines', label: 'Usage Guidelines' },
] as const;
