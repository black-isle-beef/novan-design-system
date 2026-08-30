import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-form-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-form-layout-component',
  },
})
export class DsFormLayoutComponent {
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

  readonly htmlSnippet = `<!-- Grid Layout -->
<form class="row g-3">
  <div class="col-md-6">
    <label for="gridEmail" class="form-label">Email</label>
    <input type="email" class="form-control" id="gridEmail">
  </div>
  <div class="col-md-6">
    <label for="gridPhone" class="form-label">Phone</label>
    <input type="tel" class="form-control" id="gridPhone">
  </div>
</form>

<!-- Horizontal Layout -->
<div class="row mb-3">
  <label for="horizEmail" class="col-sm-3 col-form-label">Account Email</label>
  <div class="col-sm-9">
    <input type="email" class="form-control" id="horizEmail">
  </div>
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-layout.component.html'
})
export class DsFormLayoutComponent {}`;
}
