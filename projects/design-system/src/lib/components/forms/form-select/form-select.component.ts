import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-form-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-form-select-component',
  },
})
export class DsFormSelectComponent {
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
  <label for="singleSelect" class="form-label">Default Select</label>
  <select class="form-control" id="singleSelect">
    <option selected>Open this select menu</option>
    <option value="1">Option One</option>
    <option value="2">Option Two</option>
    <option value="3" disabled>Disabled Option</option>
  </select>
</div>

<div class="mb-3">
  <label for="selectSm" class="form-label">Small Select (.form-control-sm)</label>
  <select class="form-control form-control-sm" id="selectSm">
    <option>Small select option</option>
  </select>
</div>

<div class="mb-3">
  <label for="selectLg" class="form-label">Large Select (.form-control-lg)</label>
  <select class="form-control form-control-lg" id="selectLg">
    <option>Large select option</option>
  </select>
</div>

<div class="mb-3">
  <label for="multiSelect" class="form-label">Multiple Select</label>
  <select class="form-control" id="multiSelect" multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-select.component.html'
})
export class DsFormSelectComponent {}`;
}
