import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-text-input-component',
  },
})
export class DsTextInputComponent {
  /** Signal for password show/hide toggle state. */
  readonly showPassword = signal(false);

  /** Dual-binding ngModel keyword context demo signal. */
  readonly ngModelKeyword = signal('Angular 22 Design System');

  /** Currently copied code snippet tab ('html' | 'ts'). */
  readonly activeCodeTab = signal<'preview' | 'html' | 'ts'>('preview');

  /** Snippet copy feedback signal. */
  readonly copied = signal(false);

  togglePasswordVisibility(): void {
    this.showPassword.update((prev) => !prev);
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

  readonly htmlSnippet = `<div class="mb-3">
  <label for="standardTextInput" class="form-label">Standard Text Input</label>
  <input type="text" class="form-control" id="standardTextInput" placeholder="Enter full name...">
</div>

<div class="mb-3">
  <label for="standardEmailInput" class="form-label">Email address</label>
  <input type="email" class="form-control" id="standardEmailInput" placeholder="name@example.com">
</div>

<div class="mb-3">
  <label for="passwordInput" class="form-label">Password with Show/Hide</label>
  <div class="input-group">
    <input [type]="showPassword() ? 'text' : 'password'" class="form-control" id="passwordInput">
    <button class="btn btn-outline-secondary" type="button" (click)="togglePasswordVisibility()">
      <i class="bi" [ngClass]="showPassword() ? 'bi-eye-slash' : 'bi-eye'"></i>
    </button>
  </div>
</div>

<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
  <label for="floatingEmail">Floating Email label</label>
</div>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './text-input.component.html'
})
export class DsTextInputComponent {
  readonly showPassword = signal(false);

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }
}`;
}
