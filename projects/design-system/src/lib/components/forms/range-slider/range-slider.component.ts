import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ds-range-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './range-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-range-slider-component',
  },
})
export class DsRangeSliderComponent {
  /** Range Slider Reactive Form Control. */
  readonly rangeControl = new FormControl<number>(75, { nonNullable: true });

  /** Signal reflecting the live value of the range control, bridged from its `valueChanges` stream. */
  readonly rangeValue = toSignal(this.rangeControl.valueChanges, {
    initialValue: this.rangeControl.value,
  });

  /** Dual-binding ngModel Range Slider signal. */
  readonly ngModelRange = signal(65);

  readonly activeCodeTab = signal<'preview' | 'html' | 'ts'>('preview');
  readonly copied = signal(false);

  setCodeTab(tab: 'preview' | 'html' | 'ts'): void {
    this.activeCodeTab.set(tab);
  }

  copySnippet(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  readonly htmlSnippet = `<div class="mb-3">
  <div class="d-flex justify-content-between align-items-center mb-1">
    <label for="customRange" class="form-label mb-0">Volume Range Slider</label>
    <span class="badge bg-primary fs-6">{{ rangeValue() }}%</span>
  </div>
  <input type="range" class="form-range" min="0" max="100" step="1" id="customRange" [formControl]="rangeControl">
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './range-slider.component.html'
})
export class DsRangeSliderComponent {
  readonly rangeControl = new FormControl<number>(75, { nonNullable: true });
  readonly rangeValue = toSignal(this.rangeControl.valueChanges, {
    initialValue: this.rangeControl.value,
  });
}`;
}
