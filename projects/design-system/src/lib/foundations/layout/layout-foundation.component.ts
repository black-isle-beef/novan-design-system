import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  BREAKPOINTS,
  CONTAINERS,
  GRID_GAPS,
  NAV_PATTERNS,
  NAV_SECTIONS,
  PAGE_TEMPLATES,
  SPATIAL_SCALE,
  VIEWPORTS,
  type NavPattern,
  type PageTemplate,
  type ViewportOption,
} from './layout-scale';

type TabView = 'preview' | 'code';

/**
 * Interactive Storybook doc page for the layout/grid foundations: the 8px
 * spatial scale, responsive breakpoints, container widths, a 12-column
 * grid, structural navigation patterns, and full page-template previews —
 * each with copyable code and a device-viewport toggle to test responsiveness.
 */
@Component({
  selector: 'ds-layout-foundation',
  standalone: true,
  templateUrl: './layout-foundation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-lf',
  },
})
export class DsLayoutFoundationComponent {
  readonly navSections = NAV_SECTIONS;
  readonly spatialScale = SPATIAL_SCALE;
  readonly breakpoints = BREAKPOINTS;
  readonly containers = CONTAINERS;
  readonly gridGaps = GRID_GAPS;
  readonly navPatterns = NAV_PATTERNS;
  readonly pageTemplates = PAGE_TEMPLATES;
  readonly viewports = VIEWPORTS;

  private readonly navPatternsById = new Map(this.navPatterns.map((p) => [p.id, p]));
  private readonly pageTemplatesById = new Map(this.pageTemplates.map((t) => [t.id, t]));
  private readonly viewportsById = new Map(this.viewports.map((v) => [v.id, v]));

  readonly selectedNavPatternId = signal<NavPattern['id']>('top');
  readonly navTab = signal<TabView>('preview');

  readonly selectedPageTemplateId = signal<PageTemplate['id']>('landing');
  readonly templateTab = signal<TabView>('preview');

  readonly viewportId = signal<ViewportOption['id']>('desktop');

  /** Hex/code snippet most recently copied, shown as transient "Copied!" feedback. */
  readonly copiedKey = signal<string | null>(null);

  readonly selectedNavPattern = computed(
    () => this.navPatternsById.get(this.selectedNavPatternId()) ?? this.navPatterns[0],
  );

  readonly selectedPageTemplate = computed(
    () => this.pageTemplatesById.get(this.selectedPageTemplateId()) ?? this.pageTemplates[0],
  );

  readonly viewportWidth = computed(() => this.viewportsById.get(this.viewportId())?.width ?? '100%');

  selectNavPattern(id: NavPattern['id']): void {
    this.selectedNavPatternId.set(id);
  }

  setNavTab(tab: TabView): void {
    this.navTab.set(tab);
  }

  selectPageTemplate(id: PageTemplate['id']): void {
    this.selectedPageTemplateId.set(id);
  }

  setTemplateTab(tab: TabView): void {
    this.templateTab.set(tab);
  }

  setViewport(id: ViewportOption['id']): void {
    this.viewportId.set(id);
  }

  async copyCode(text: string, key: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedKey.set(key);
      setTimeout(() => {
        if (this.copiedKey() === key) {
          this.copiedKey.set(null);
        }
      }, 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  }
}
