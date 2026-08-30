import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  CATEGORY_DEFS,
  DESIGN_TOKENS,
  type CategoryDef,
  type DesignToken,
  type TokenCategory,
} from './token-data';

type Theme = 'light' | 'dark';
type ExportFormat = 'css' | 'scss' | 'bootstrap' | 'json';

interface TokenGroup {
  readonly group: string;
  readonly tokens: readonly DesignToken[];
}

interface CategorySection {
  readonly id: TokenCategory;
  readonly label: string;
  readonly groups: readonly TokenGroup[];
}

const EXPORT_FORMATS: readonly { id: ExportFormat; label: string }[] = [
  { id: 'css', label: 'CSS' },
  { id: 'scss', label: 'SCSS' },
  { id: 'bootstrap', label: 'Bootstrap' },
  { id: 'json', label: 'JSON' },
];

/** kebab-case, safe to splice into a Sass map variable name. */
function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function groupBy<T, K>(items: readonly T[], keyFn: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const bucket = map.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  return map;
}

/**
 * Interactive Storybook doc page for the full design-token architecture:
 * raw color palettes, semantic aliases, typography, spacing, elevation,
 * radius, motion, and z-index. Provides a searchable/filterable swatch
 * grid, a light/dark theme preview for semantic color tokens, per-token
 * copy-to-clipboard, and CSS/SCSS/Bootstrap Sass-map/JSON code export.
 */
@Component({
  selector: 'ds-design-tokens-foundation',
  standalone: true,
  templateUrl: './design-tokens-foundation.component.html',
  styleUrl: './design-tokens-foundation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-dt',
  },
})
export class DsDesignTokensFoundationComponent {
  readonly categories: readonly CategoryDef[] = CATEGORY_DEFS;
  readonly exportFormats = EXPORT_FORMATS;

  readonly theme = signal<Theme>('light');
  readonly activeCategory = signal<TokenCategory | 'all'>('all');
  readonly searchTerm = signal('');
  readonly exportFormat = signal<ExportFormat>('css');

  /** Token cssVar most recently copied (variable or value), for transient "Copied!" feedback. */
  readonly copiedKey = signal<string | null>(null);

  toggleTheme(): void {
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  setCategory(id: TokenCategory | 'all'): void {
    this.activeCategory.set(id);
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  onSearchInput(event: Event): void {
    this.setSearchTerm((event.target as HTMLInputElement).value);
  }

  setExportFormat(id: ExportFormat): void {
    this.exportFormat.set(id);
  }

  /** Resolves a token's displayed value for the active theme (dark falls back to light when no override exists). */
  resolveValue(token: DesignToken): string {
    return this.theme() === 'dark' ? (token.darkValue ?? token.value) : token.value;
  }

  private readonly filteredTokens = computed(() => {
    const category = this.activeCategory();
    const term = this.searchTerm().trim().toLowerCase();

    return DESIGN_TOKENS.filter((token) => {
      if (category !== 'all' && token.category !== category) {
        return false;
      }
      if (!term) {
        return true;
      }
      const haystack = `${token.cssVar} ${token.scssVar} ${token.value} ${token.darkValue ?? ''} ${token.usage}`.toLowerCase();
      return haystack.includes(term);
    });
  });

  readonly resultCount = computed(() => this.filteredTokens().length);

  readonly sections = computed<readonly CategorySection[]>(() => {
    const tokens = this.filteredTokens();
    const byCategory = groupBy(tokens, (t) => t.category);

    return this.categories
      .filter((def): def is CategoryDef & { id: TokenCategory } => def.id !== 'all')
      .map((def) => {
        const categoryTokens = byCategory.get(def.id) ?? [];
        const byGroup = groupBy(categoryTokens, (t) => t.group);
        const groups: TokenGroup[] = Array.from(byGroup.entries()).map(([group, groupTokens]) => ({
          group,
          tokens: groupTokens,
        }));
        return { id: def.id, label: def.label, groups };
      })
      .filter((section) => section.groups.length > 0);
  });

  readonly activeExportLabel = computed(
    () => this.exportFormats.find((f) => f.id === this.exportFormat())?.label ?? '',
  );

  readonly exportedCode = computed(() => {
    switch (this.exportFormat()) {
      case 'css':
        return this.buildCss();
      case 'scss':
        return this.buildScss();
      case 'bootstrap':
        return this.buildBootstrap();
      case 'json':
        return this.buildJson();
    }
  });

  private buildCss(): string {
    const lightLines = DESIGN_TOKENS.map((t) => `  ${t.cssVar}: ${t.value};`);
    const darkTokens = DESIGN_TOKENS.filter((t) => t.darkValue !== undefined);
    const darkLines = darkTokens.map((t) => `  ${t.cssVar}: ${t.darkValue};`);

    return [':root {', ...lightLines, '}', '', "[data-theme='dark'] {", ...darkLines, '}'].join('\n');
  }

  private buildScss(): string {
    return DESIGN_TOKENS.map((t) => `${t.scssVar}: ${t.value};`).join('\n');
  }

  /** Sass maps grouped the same way `_colors.scss`/`_spacers.scss` override Bootstrap's own `$theme-colors`/`$spacers`. */
  private buildBootstrap(): string {
    const byCategory = groupBy(DESIGN_TOKENS, (t) => t.category);
    const blocks: string[] = [];

    for (const [category, tokens] of byCategory) {
      const byGroup = groupBy(tokens, (t) => t.group);
      for (const [group, groupTokens] of byGroup) {
        const mapName = `$ds-${category}-${slug(group)}`;
        const entries = groupTokens.map((t) => `  '${t.key}': ${t.value},`).join('\n');
        blocks.push(`${mapName}: (\n${entries}\n);`);
      }
    }

    return blocks.join('\n\n');
  }

  private buildJson(): string {
    const byCategory = groupBy(DESIGN_TOKENS, (t) => t.category);
    const result: Record<string, Record<string, unknown>> = {};

    for (const [category, tokens] of byCategory) {
      const byGroup = groupBy(tokens, (t) => t.group);
      const groupResult: Record<string, unknown> = {};
      for (const [group, groupTokens] of byGroup) {
        groupResult[group] = Object.fromEntries(
          groupTokens.map((t) => [
            t.key,
            t.darkValue !== undefined ? { light: t.value, dark: t.darkValue } : t.value,
          ]),
        );
      }
      result[category] = groupResult;
    }

    return JSON.stringify(result, null, 2);
  }

  async copyText(text: string, key: string): Promise<void> {
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
