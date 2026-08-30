import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-input-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-input-group-component',
  },
})
export class DsInputGroupComponent {
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

  readonly htmlSnippet = `<!-- Prefix Badge -->
<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username">
</div>

<!-- Suffix Badge -->
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username">
  <span class="input-group-text" id="basic-addon2">@example.com</span>
</div>

<!-- Multiple Grouped Inputs -->
<div class="input-group mb-3">
  <span class="input-group-text">First and last name</span>
  <input type="text" aria-label="First name" class="form-control">
  <input type="text" aria-label="Last name" class="form-control">
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-group.component.html'
})
export class DsInputGroupComponent {}`;
}
