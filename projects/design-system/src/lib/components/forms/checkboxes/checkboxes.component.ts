import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsIndeterminateDirective } from '../indeterminate.directive';

@Component({
  selector: 'ds-checkboxes',
  standalone: true,
  imports: [CommonModule, FormsModule, DsIndeterminateDirective],
  templateUrl: './checkboxes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-checkboxes-component',
  },
})
export class DsCheckboxesComponent {
  readonly ngModelChecked = signal(true);
  readonly isIndeterminate = signal(true);
  readonly activeCodeTab = signal<'preview' | 'html' | 'ts'>('preview');
  readonly copied = signal(false);

  toggleIndeterminate(): void {
    this.isIndeterminate.update((prev) => !prev);
  }

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

  readonly htmlSnippet = `<!-- Standard Checkbox -->
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" id="checkDefault">
  <label class="form-check-label" for="checkDefault">Default checkbox</label>
</div>

<!-- Switch Toggle -->
<div class="form-check form-switch mb-3">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch toggle</label>
</div>

<!-- Indeterminate Checkbox -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="indeterminateCheck" [dsIndeterminate]="isIndeterminate()">
  <label class="form-check-label" for="indeterminateCheck">Indeterminate checkbox</label>
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [DsIndeterminateDirective, FormsModule, CommonModule],
  templateUrl: './checkboxes.component.html'
})
export class DsCheckboxesComponent {
  readonly isIndeterminate = signal(true);
}`;
}
