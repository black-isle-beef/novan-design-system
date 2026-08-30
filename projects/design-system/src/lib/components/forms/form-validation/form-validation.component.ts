import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ds-form-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-form-validation-component',
  },
})
export class DsFormValidationComponent {
  private readonly fb = inject(FormBuilder);

  readonly formSubmitted = signal(false);
  readonly submittedData = signal<Record<string, unknown> | null>(null);
  readonly activeCodeTab = signal<'preview' | 'html' | 'ts'>('preview');
  readonly copied = signal(false);

  readonly validationForm: FormGroup = this.fb.group({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9_]+$')],
      asyncValidators: [this.createUsernameAsyncValidator()],
      updateOn: 'change',
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('developer', [Validators.required]),
    agreeTerms: new FormControl(false, [Validators.requiredTrue]),
  });

  getControlClass(controlName: string): Record<string, boolean> {
    const control = this.validationForm.get(controlName);
    if (!control) return {};
    const isTouchedOrDirty = control.touched || control.dirty || this.formSubmitted();
    return {
      'is-invalid': control.invalid && isTouchedOrDirty,
      'is-valid': control.valid && isTouchedOrDirty,
    };
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

  submitValidationForm(): void {
    this.formSubmitted.set(true);
    if (this.validationForm.valid) {
      this.submittedData.set(this.validationForm.value);
    } else {
      this.validationForm.markAllAsTouched();
    }
  }

  resetValidationForm(): void {
    this.validationForm.reset({
      username: '',
      email: '',
      password: '',
      role: 'developer',
      agreeTerms: false,
    });
    this.formSubmitted.set(false);
    this.submittedData.set(null);
  }

  private createUsernameAsyncValidator(): AsyncValidatorFn {
    const takenUsernames = ['admin', 'taken', 'john_doe', 'root'];
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return timer(600).pipe(
        map(() => {
          const val = String(control.value).toLowerCase().trim();
          return takenUsernames.includes(val) ? { usernameTaken: true } : null;
        }),
      );
    };
  }

  readonly htmlSnippet = `<form [formGroup]="validationForm" (ngSubmit)="submitValidationForm()" [ngClass]="{'was-validated': formSubmitted()}" novalidate>
  <!-- Username with Custom Async Validator -->
  <div class="mb-3">
    <label for="valUsername" class="form-label">Username (Async check)</label>
    <div class="input-group">
      <span class="input-group-text">@</span>
      <input type="text" class="form-control" id="valUsername" formControlName="username" [ngClass]="getControlClass('username')">
      @if (validationForm.get('username')?.pending) {
        <span class="input-group-text text-primary">
          <span class="spinner-border spinner-border-sm me-1" role="status"></span> Checking...
        </span>
      }
    </div>
    @if (validationForm.get('username')?.hasError('required') && (validationForm.get('username')?.touched || formSubmitted())) {
      <div class="invalid-feedback d-block">Username is required.</div>
    }
  </div>

  <button type="submit" class="btn btn-primary" [disabled]="validationForm.invalid || validationForm.pending">Submit</button>
</form>`;

  readonly tsSnippet = `@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-validation.component.html'
})
export class DsFormValidationComponent {
  readonly validationForm = this.fb.group({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: [this.createUsernameAsyncValidator()],
      updateOn: 'change'
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    agreeTerms: new FormControl(false, [Validators.requiredTrue])
  });
}`;
}
