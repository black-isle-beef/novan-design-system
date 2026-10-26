import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-radio-buttons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-radio-buttons-component',
  },
})
export class DsRadioButtonsComponent {
  readonly ngModelRole = signal('developer');
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

  readonly htmlSnippet = `<!-- Stacked Radios -->
<div class="form-field mb-2">
  <input class="radio" type="radio" name="flexRadioDefault" id="radio1" checked>
  <label for="radio1">Default radio</label>
</div>

<!-- Inline Radios -->
<div class="form-field d-inline-grid me-4">
  <input class="radio" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label for="inlineRadio1">Inline 1</label>
</div>

<!-- Toggle Button Group -->
<div class="btn-group" role="group">
  <label class="btn-check btn btn-outline theme-primary"><input type="radio" name="btnradio" autocomplete="off" checked>Radio 1</label>
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './radio-buttons.component.html'
})
export class DsRadioButtonsComponent {
  readonly ngModelRole = signal('developer');
}`;
}
