import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  BRAND_PALETTE,
  ROLE_DEFINITIONS,
  type BrandRole,
  type ColorFamily,
  type ColorToken,
  type RoleDefinition,
} from './brand-palette';

interface RoleSelection {
  readonly familyId: string;
  readonly tokenIndex: number;
}

/** A palette color offered in a role-assignment dropdown, flattened for easy iteration. */
interface RoleOption {
  readonly familyId: string;
  readonly tokenIndex: number;
  readonly familyLabel: string;
  readonly token: ColorToken;
}

/**
 * Interactive Storybook doc page: lets readers assign palette colors to
 * brand roles (primary/secondary/tertiary/success/warning/danger) and
 * previews the result live across typography, buttons, inputs, and feedback
 * components. Also renders the full palette as copyable swatch cards.
 */
@Component({
  selector: 'ds-brand-foundation',
  standalone: true,
  templateUrl: './brand-foundation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-brand-foundation',
  },
})
export class DsBrandFoundationComponent {
  readonly families: readonly ColorFamily[] = BRAND_PALETTE;
  readonly roleDefinitions: readonly RoleDefinition[] = ROLE_DEFINITIONS;

  /** Every palette token, flattened, for populating role-assignment selects. */
  readonly roleOptions: readonly RoleOption[] = BRAND_PALETTE.flatMap((family) =>
    family.tokens.map((token, tokenIndex) => ({
      familyId: family.id,
      tokenIndex,
      familyLabel: family.label,
      token,
    })),
  );

  private readonly defaultSelections: Record<BrandRole, RoleSelection> = Object.fromEntries(
    ROLE_DEFINITIONS.map((def) => [def.role, { familyId: def.defaultFamilyId, tokenIndex: def.defaultTokenIndex }]),
  ) as Record<BrandRole, RoleSelection>;

  private readonly selections = signal<Record<BrandRole, RoleSelection>>({ ...this.defaultSelections });

  /** Whether the role-assignment modal is open. */
  readonly assignmentOpen = signal(false);

  /** In-progress selections edited inside the modal, applied on "Apply". */
  private readonly draftSelections = signal<Record<BrandRole, RoleSelection>>({ ...this.defaultSelections });

  /** Hex value most recently copied, shown as transient "Copied!" feedback. */
  readonly copiedHex = signal<string | null>(null);

  private readonly familiesById = new Map(this.families.map((family) => [family.id, family]));

  private resolveToken(selection: RoleSelection): ColorToken {
    const family = this.familiesById.get(selection.familyId) ?? this.families[0];
    return family.tokens[selection.tokenIndex] ?? family.tokens[0];
  }

  /** Adjacent shade within the same family, clamped, used for hover/active states. */
  private shadeAt(selection: RoleSelection, delta: number): ColorToken {
    const family = this.familiesById.get(selection.familyId) ?? this.families[0];
    const index = Math.min(Math.max(selection.tokenIndex + delta, 0), family.tokens.length - 1);
    return family.tokens[index];
  }

  /**
   * Darkest shade in the assigned family. Used for text and borders that sit on
   * the light `-bg` fill (alerts, badges) so they clear the WCAG AA 4.5:1
   * contrast ratio — the mid-tone accent (`--ds-<role>`) does not.
   */
  private textShade(selection: RoleSelection): ColorToken {
    const family = this.familiesById.get(selection.familyId) ?? this.families[0];
    return family.tokens[family.tokens.length - 1];
  }

  readonly resolvedRoles = computed(() => {
    const current = this.selections();
    return Object.fromEntries(
      this.roleDefinitions.map((def) => [def.role, this.resolveToken(current[def.role])]),
    ) as Record<BrandRole, ColorToken>;
  });

  /** CSS custom properties driving the live demo dashboard below. */
  readonly themeVars = computed(() => {
    const current = this.selections();
    const vars: Record<string, string> = {};
    for (const def of this.roleDefinitions) {
      const selection = current[def.role];
      vars[`--ds-${def.role}`] = this.resolveToken(selection).hex;
      vars[`--ds-${def.role}-hover`] = this.shadeAt(selection, 1).hex;
      vars[`--ds-${def.role}-active`] = this.shadeAt(selection, 2).hex;
      vars[`--ds-${def.role}-bg`] = this.shadeAt(selection, -selection.tokenIndex).hex;
      vars[`--ds-${def.role}-text`] = this.textShade(selection).hex;
    }
    return vars;
  });

  openAssignment(): void {
    this.draftSelections.set({ ...this.selections() });
    this.assignmentOpen.set(true);
  }

  closeAssignment(): void {
    this.assignmentOpen.set(false);
  }

  onDraftChange(role: BrandRole, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const [familyId, tokenIndexRaw] = select.value.split('::');
    this.draftSelections.update((current) => ({
      ...current,
      [role]: { familyId, tokenIndex: Number(tokenIndexRaw) },
    }));
  }

  draftValueFor(role: BrandRole): string {
    const selection = this.draftSelections()[role];
    return `${selection.familyId}::${selection.tokenIndex}`;
  }

  draftTokenFor(role: BrandRole): ColorToken {
    return this.resolveToken(this.draftSelections()[role]);
  }

  applyAssignment(): void {
    this.selections.set({ ...this.draftSelections() });
    this.assignmentOpen.set(false);
  }

  resetToDefaults(): void {
    this.draftSelections.set({ ...this.defaultSelections });
  }

  async copyHex(hex: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(hex);
      this.copiedHex.set(hex);
      setTimeout(() => {
        if (this.copiedHex() === hex) {
          this.copiedHex.set(null);
        }
      }, 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  }
}
