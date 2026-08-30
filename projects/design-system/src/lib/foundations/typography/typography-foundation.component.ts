import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FONT_WEIGHTS, HEADING_SCALE, NAV_SECTIONS, PANGRAM, type FontWeightToken } from './typography-scale';

/**
 * Interactive Storybook doc page demonstrating the full Montserrat font
 * family: locally-hosted `@font-face` weights 100-900 (+ italics) and a
 * variable-font axis, the heading/body type scale, a weight comparison
 * grid, and a live font-size/line-height/letter-spacing/weight playground.
 */
@Component({
  selector: 'ds-typography-foundation',
  standalone: true,
  templateUrl: './typography-foundation.component.html',
  styleUrl: './typography-foundation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-tf',
    '[class.ds-tf--dark]': 'darkMode()',
  },
})
export class DsTypographyFoundationComponent {
  readonly fontWeights: readonly FontWeightToken[] = FONT_WEIGHTS;
  readonly headingScale = HEADING_SCALE;
  readonly navSections = NAV_SECTIONS;
  readonly pangram = PANGRAM;

  readonly darkMode = signal(false);

  toggleDarkMode(): void {
    this.darkMode.update((value) => !value);
  }

  // Playground controls
  readonly playgroundText = signal(PANGRAM);
  readonly playgroundSize = signal(24);
  readonly playgroundLineHeight = signal(1.5);
  readonly playgroundLetterSpacing = signal(0);
  readonly playgroundWeight = signal(400);

  readonly playgroundStyle = computed(() => ({
    'font-size': `${this.playgroundSize()}px`,
    'line-height': `${this.playgroundLineHeight()}`,
    'letter-spacing': `${this.playgroundLetterSpacing()}px`,
    'font-weight': `${this.playgroundWeight()}`,
  }));

  onPlaygroundTextChange(event: Event): void {
    this.playgroundText.set((event.target as HTMLInputElement).value);
  }

  onPlaygroundSizeChange(event: Event): void {
    this.playgroundSize.set(Number((event.target as HTMLInputElement).value));
  }

  onPlaygroundLineHeightChange(event: Event): void {
    this.playgroundLineHeight.set(Number((event.target as HTMLInputElement).value));
  }

  onPlaygroundLetterSpacingChange(event: Event): void {
    this.playgroundLetterSpacing.set(Number((event.target as HTMLInputElement).value));
  }

  onPlaygroundWeightChange(event: Event): void {
    this.playgroundWeight.set(Number((event.target as HTMLInputElement).value));
  }
}
