/** One entry on the 8px spatial scale. */
export interface SpacingToken {
  readonly token: string;
  readonly px: number;
  readonly usage: string;
}

export const SPATIAL_SCALE: readonly SpacingToken[] = [
  { token: 'space-1', px: 8, usage: 'Tightest gaps: icon-to-label, chip padding.' },
  { token: 'space-2', px: 16, usage: 'Default gap between related inline/stacked elements.' },
  { token: 'space-3', px: 24, usage: 'Card padding, gap between form fields.' },
  { token: 'space-4', px: 32, usage: 'Gap between grid cards, section sub-groups.' },
  { token: 'space-5', px: 48, usage: 'Gap between major page sections on mobile.' },
  { token: 'space-6', px: 64, usage: 'Section padding-block on tablet/desktop.' },
  { token: 'space-7', px: 96, usage: 'Hero/landing section padding-block on desktop.' },
] as const;

/** One responsive breakpoint tier. */
export interface BreakpointToken {
  readonly name: string;
  readonly range: string;
  readonly minWidth: string;
  readonly cssVar: string;
}

export const BREAKPOINTS: readonly BreakpointToken[] = [
  { name: 'Mobile', range: '320px – 767px', minWidth: '0px', cssVar: '--ds-bp-mobile' },
  { name: 'Tablet', range: '768px – 1023px', minWidth: '768px', cssVar: '--ds-bp-tablet' },
  { name: 'Desktop', range: '1024px – 1439px', minWidth: '1024px', cssVar: '--ds-bp-desktop' },
  { name: 'Wide', range: '1440px+', minWidth: '1440px', cssVar: '--ds-bp-wide' },
] as const;

/** One named container max-width. */
export interface ContainerToken {
  readonly name: string;
  readonly maxWidth: string;
  readonly usage: string;
}

export const CONTAINERS: readonly ContainerToken[] = [
  { name: 'Standard', maxWidth: '1200px', usage: 'Default page container for most content pages.' },
  { name: 'Narrow', maxWidth: '800px', usage: 'Long-form reading content: articles, docs, legal text.' },
  { name: 'Full-width', maxWidth: '100%', usage: 'Hero banners, full-bleed media, dashboard shells.' },
] as const;

/** Responsive gap scale used by the 12-column grid at each breakpoint. */
export interface GridGapToken {
  readonly breakpoint: string;
  readonly gap: string;
}

export const GRID_GAPS: readonly GridGapToken[] = [
  { breakpoint: 'Mobile', gap: '16px' },
  { breakpoint: 'Tablet', gap: '24px' },
  { breakpoint: 'Desktop', gap: '32px' },
] as const;

/** A structural navigation layout pattern with copyable HTML/CSS. */
export interface NavPattern {
  readonly id: 'top' | 'sidebar' | 'combined';
  readonly label: string;
  readonly description: string;
  readonly html: string;
  readonly css: string;
}

export const NAV_PATTERNS: readonly NavPattern[] = [
  {
    id: 'top',
    label: 'Top Navigation',
    description:
      'Sticky/fixed header with logo, horizontal link group, right-aligned utility actions (search, avatar, CTA), and a mobile hamburger toggle.',
    html: `<header class="site-header">
  <a class="site-header__logo" href="/">Logo</a>

  <nav class="site-header__nav" aria-label="Primary">
    <a href="/products">Products</a>
    <a href="/solutions">Solutions</a>
    <a href="/pricing">Pricing</a>
    <a href="/docs">Docs</a>
  </nav>

  <div class="site-header__actions">
    <button type="button" aria-label="Search">🔍</button>
    <img class="site-header__avatar" src="/avatar.jpg" alt="" />
    <button type="button" class="btn btn--primary">Get started</button>
    <button type="button" class="site-header__hamburger" aria-label="Menu" aria-expanded="false">☰</button>
  </div>
</header>`,
    css: `.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: var(--space-4, 32px);
  padding-block: var(--space-2, 16px);
  padding-inline: var(--space-3, 24px);
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
}
.site-header__nav {
  display: flex;
  gap: var(--space-3, 24px);
  margin-inline-end: auto;
}
.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2, 16px);
}
.site-header__hamburger { display: none; }
@media (max-width: 767px) {
  .site-header__nav { display: none; }
  .site-header__hamburger { display: inline-flex; }
}`,
  },
  {
    id: 'sidebar',
    label: 'Sidebar Navigation',
    description:
      'Vertical collapsible sidebar with active-state styling, sub-menu items, a search bar, and a main-content offset strategy.',
    html: `<div class="app-shell">
  <aside class="app-sidebar" data-collapsed="false">
    <input class="app-sidebar__search" type="search" placeholder="Search..." />
    <nav aria-label="Primary">
      <a class="app-sidebar__link app-sidebar__link--active" href="/overview">Overview</a>
      <a class="app-sidebar__link" href="/projects">Projects</a>
      <div class="app-sidebar__submenu">
        <a class="app-sidebar__sublink" href="/projects/active">Active</a>
        <a class="app-sidebar__sublink" href="/projects/archived">Archived</a>
      </div>
      <a class="app-sidebar__link" href="/settings">Settings</a>
    </nav>
    <button type="button" class="app-sidebar__collapse">« Collapse</button>
  </aside>

  <main class="app-main">
    <!-- Page content, offset by the sidebar's width -->
  </main>
</div>`,
    css: `.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}
.app-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 16px);
  padding: var(--space-3, 24px);
  border-inline-end: 1px solid #e2e2e2;
}
.app-sidebar[data-collapsed='true'] { width: 64px; }
.app-sidebar__link--active {
  font-weight: 600;
  color: var(--ds-primary, #0a2f73);
}
.app-sidebar__submenu {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 8px);
  padding-inline-start: var(--space-3, 24px);
}
.app-main {
  padding: var(--space-4, 32px);
  min-width: 0; /* offset strategy: grid column absorbs remaining width */
}`,
  },
  {
    id: 'combined',
    label: 'Combined Navigation',
    description: 'A top utility bar (branding, global search, account) paired with a secondary side navigation.',
    html: `<div class="combined-shell">
  <header class="combined-topbar">
    <a class="combined-topbar__logo" href="/">Logo</a>
    <input class="combined-topbar__search" type="search" placeholder="Search everything..." />
    <button type="button" class="combined-topbar__account">Account ▾</button>
  </header>

  <div class="combined-body">
    <aside class="combined-sidenav" aria-label="Section">
      <a href="/section/one">Section One</a>
      <a href="/section/two">Section Two</a>
    </aside>
    <main class="combined-main"><!-- Page content --></main>
  </div>
</div>`,
    css: `.combined-shell { display: flex; flex-direction: column; min-height: 100vh; }
.combined-topbar {
  display: flex;
  align-items: center;
  gap: var(--space-3, 24px);
  padding: var(--space-2, 16px) var(--space-3, 24px);
  border-bottom: 1px solid #e2e2e2;
}
.combined-topbar__search { flex: 1; max-width: 480px; }
.combined-body { display: grid; grid-template-columns: 220px 1fr; flex: 1; }
.combined-sidenav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 16px);
  padding: var(--space-3, 24px);
  border-inline-end: 1px solid #e2e2e2;
}
.combined-main { padding: var(--space-4, 32px); }`,
  },
] as const;

/** A full-page structural template with copyable HTML/CSS. */
export interface PageTemplate {
  readonly id: 'landing' | 'content' | 'dashboard';
  readonly label: string;
  readonly description: string;
  readonly html: string;
  readonly css: string;
}

export const PAGE_TEMPLATES: readonly PageTemplate[] = [
  {
    id: 'landing',
    label: 'Main Landing Page',
    description:
      'Full-width hero, a 3-column feature grid (1-column on mobile), a 4-column stats strip, and a multi-column footer.',
    html: `<main>
  <section class="hero">
    <h1>Headline that sells the product</h1>
    <p>Supporting paragraph explaining the value proposition in one or two sentences.</p>
    <div class="hero__ctas">
      <button class="btn btn--primary">Primary CTA</button>
      <button class="btn btn--secondary">Secondary CTA</button>
    </div>
    <div class="hero__media" aria-hidden="true"><!-- background image/video placeholder --></div>
  </section>

  <section class="feature-grid">
    <article class="feature-card">Feature one</article>
    <article class="feature-card">Feature two</article>
    <article class="feature-card">Feature three</article>
  </section>

  <section class="stats-strip">
    <div class="stat">10k+ customers</div>
    <div class="stat">99.9% uptime</div>
    <div class="stat">120 countries</div>
    <div class="stat">24/7 support</div>
  </section>

  <footer class="site-footer">
    <div class="site-footer__col"><h3>Product</h3><a href="/features">Features</a><a href="/pricing">Pricing</a></div>
    <div class="site-footer__col"><h3>Company</h3><a href="/about">About</a><a href="/careers">Careers</a></div>
    <div class="site-footer__col"><h3>Resources</h3><a href="/docs">Docs</a><a href="/blog">Blog</a></div>
    <p class="site-footer__copyright">© 2026 Company, Inc.</p>
  </footer>
</main>`,
    css: `.hero { padding-block: var(--space-7, 96px); text-align: center; position: relative; }
.hero__ctas { display: flex; gap: var(--space-2, 16px); justify-content: center; }

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4, 32px);
  padding-block: var(--space-6, 64px);
}
@media (max-width: 767px) {
  .feature-grid { grid-template-columns: 1fr; }
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3, 24px);
  padding-block: var(--space-5, 48px);
}
@media (max-width: 767px) {
  .stats-strip { grid-template-columns: repeat(2, 1fr); }
}

.site-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4, 32px);
  padding-block: var(--space-6, 64px);
}`,
  },
  {
    id: 'content',
    label: 'Standard Content Page',
    description:
      'Page header (title, breadcrumbs, category badge) above a 70/30 asymmetric layout: article content with inline CTA cards, and a sticky sidebar of quick links.',
    html: `<main class="content-page">
  <header class="content-page__header">
    <nav class="breadcrumbs" aria-label="Breadcrumb">Home / Docs / Getting Started</nav>
    <span class="badge">Guide</span>
    <h1>Getting started with the design system</h1>
  </header>

  <div class="content-page__body">
    <article class="content-page__article">
      <p>Article copy...</p>
      <aside class="cta-card">
        <h2>Related resource</h2>
        <p>Short supporting copy.</p>
        <button class="btn btn--primary">Read more</button>
      </aside>
      <p>More article copy...</p>
    </article>

    <aside class="content-page__sidebar">
      <h2>On this page</h2>
      <a href="#section-1">Section one</a>
      <a href="#section-2">Section two</a>
    </aside>
  </div>
</main>`,
    css: `.content-page__body {
  display: grid;
  grid-template-columns: 70% 30%;
  gap: var(--space-4, 32px);
  max-width: var(--ds-container-standard, 1200px);
  margin-inline: auto;
}
@media (max-width: 1023px) {
  .content-page__body { grid-template-columns: 1fr; }
}
.content-page__sidebar {
  position: sticky;
  top: var(--space-3, 24px);
  align-self: start;
}
.cta-card {
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: var(--space-3, 24px);
  margin-block: var(--space-4, 32px);
}`,
  },
  {
    id: 'dashboard',
    label: 'Dashboard / Web App',
    description: 'Persistent sidebar, a top search header, and a fluid main content grid of responsive cards/widgets.',
    html: `<div class="dashboard-shell">
  <aside class="dashboard-sidebar"><!-- persistent nav --></aside>

  <div class="dashboard-body">
    <header class="dashboard-topbar">
      <input type="search" placeholder="Search..." />
      <button type="button" class="btn btn--primary">New</button>
    </header>

    <main class="dashboard-grid">
      <section class="widget widget--wide">Revenue chart</section>
      <section class="widget">Active users</section>
      <section class="widget">Conversion rate</section>
      <section class="widget">Recent activity</section>
    </main>
  </div>
</div>`,
    css: `.dashboard-shell { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
.dashboard-topbar {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3, 24px);
  padding: var(--space-2, 16px) var(--space-3, 24px);
  border-bottom: 1px solid #e2e2e2;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-3, 24px);
  padding: var(--space-3, 24px);
}
.widget--wide { grid-column: 1 / -1; }`,
  },
] as const;

/** Preview viewport option for the device-width toggle bar. */
export interface ViewportOption {
  readonly id: 'desktop' | 'tablet' | 'mobile';
  readonly label: string;
  readonly width: string;
}

export const VIEWPORTS: readonly ViewportOption[] = [
  { id: 'desktop', label: 'Desktop', width: '100%' },
  { id: 'tablet', label: 'Tablet', width: '768px' },
  { id: 'mobile', label: 'Mobile', width: '375px' },
] as const;

/** Sticky side-drawer navigation targets. */
export interface LayoutNavSection {
  readonly id: string;
  readonly label: string;
}

export const NAV_SECTIONS: readonly LayoutNavSection[] = [
  { id: 'scale', label: 'Spatial Scale' },
  { id: 'breakpoints', label: 'Breakpoints' },
  { id: 'containers', label: 'Containers & Grid' },
  { id: 'navigation', label: 'Navigation Patterns' },
  { id: 'templates', label: 'Page Templates' },
] as const;
