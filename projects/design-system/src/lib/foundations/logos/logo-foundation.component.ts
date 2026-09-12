import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  BACKGROUND_PAIRINGS,
  COMPACT_LOCKUPS,
  ICON_MARKS,
  LOGO_VIEWPORTS,
  NAV_SECTIONS,
  PRIMARY_LOCKUPS,
  WEB_LOCKUP_SNIPPETS,
  type LogoMark,
  type LogoViewport,
} from './logo-assets';

type TabView = 'preview' | 'code';

/**
 * Interactive Storybook doc page for the Novan Web Services logo system: the
 * primary and compact lockups, which color variant to use on which
 * background, a responsive site-header preview across desktop/tablet/mobile,
 * and copyable HTML/CSS pairing the scalable SVG mark with live wordmark text.
 */
@Component({
  selector: 'ds-logo-foundation',
  standalone: true,
  templateUrl: './logo-foundation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-logo-foundation',
  },
})
export class DsLogoFoundationComponent {
  readonly navSections = NAV_SECTIONS;
  readonly primaryLockups = PRIMARY_LOCKUPS;
  readonly compactLockups = COMPACT_LOCKUPS;
  readonly iconMarks = ICON_MARKS;
  readonly backgroundPairings = BACKGROUND_PAIRINGS;
  readonly viewports = LOGO_VIEWPORTS;
  readonly webLockupSnippets = WEB_LOCKUP_SNIPPETS;

  private readonly iconMarksById = new Map(this.iconMarks.map((m) => [m.id, m]));
  private readonly viewportsById = new Map(this.viewports.map((v) => [v.id, v]));
  private readonly snippetsByMarkId = new Map(this.webLockupSnippets.map((s) => [s.markId, s]));

  readonly viewportId = signal<LogoViewport['id']>('desktop');
  readonly selectedMarkId = signal<string>(this.iconMarks[0].id);
  readonly lockupTab = signal<TabView>('preview');

  /** Snippet/hex most recently copied, shown as transient "Copied!" feedback. */
  readonly copiedKey = signal<string | null>(null);

  readonly viewportWidth = computed(() => this.viewportsById.get(this.viewportId())?.width ?? '100%');

  readonly headerLogo = computed(() =>
    this.viewportId() === 'desktop' ? this.primaryLockups[2] : this.compactLockups[0],
  );

  readonly selectedMark = computed(() => this.iconMarksById.get(this.selectedMarkId()) ?? this.iconMarks[0]);

  readonly selectedSnippet = computed(
    () => this.snippetsByMarkId.get(this.selectedMarkId()) ?? this.webLockupSnippets[0],
  );

  setViewport(id: LogoViewport['id']): void {
    this.viewportId.set(id);
  }

  selectMark(id: string): void {
    this.selectedMarkId.set(id);
  }

  setLockupTab(tab: TabView): void {
    this.lockupTab.set(tab);
  }

  recommendedMarkLabel(markId: string): string {
    return this.iconMarksById.get(markId)?.label ?? markId;
  }

  markById(markId: string): LogoMark | undefined {
    return this.iconMarksById.get(markId);
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
