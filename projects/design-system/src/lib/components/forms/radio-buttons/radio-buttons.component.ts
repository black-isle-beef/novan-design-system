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
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio1" checked>
  <label class="form-check-label" for="radio1">Default radio</label>
</div>

<!-- Inline Radios -->
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label class="form-check-label" for="inlineRadio1">Inline 1</label>
</div>

<!-- Toggle Button Group -->
<div class="btn-group" role="group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
  <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>
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
