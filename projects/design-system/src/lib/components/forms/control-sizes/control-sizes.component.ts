import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-control-sizes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-sizes.component.html',
  styleUrl: './control-sizes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-control-sizes-component',
  },
})
export class DsControlSizesComponent {
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
  <label for="formControlLg" class="form-label">Large Input (.form-control-lg)</label>
  <input class="form-control form-control-lg" id="formControlLg" type="text" placeholder=".form-control-lg">
</div>

<div class="mb-3">
  <label for="formControlSm" class="form-label">Small Input (.form-control-sm)</label>
  <input class="form-control form-control-sm" id="formControlSm" type="text" placeholder=".form-control-sm">
</div>

<div class="mb-3">
  <label for="formFile" class="form-label">File Input Control</label>
  <input class="form-control" type="file" id="formFile">
</div>

<div class="mb-3">
  <label for="exampleColorInput" class="form-label">Color Picker</label>
  <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#0d6efd" title="Choose your color">
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-sizes.component.html'
})
export class DsControlSizesComponent {}`;
}
