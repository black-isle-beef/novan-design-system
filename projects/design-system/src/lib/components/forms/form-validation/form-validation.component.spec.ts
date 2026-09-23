import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsFormValidationComponent } from './form-validation.component';

describe('DsFormValidationComponent', () => {
  let component: DsFormValidationComponent;
  let fixture: ComponentFixture<DsFormValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsFormValidationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email field', () => {
    const emailControl = component.validationForm.get('email');
    expect(emailControl?.valid).toBe(false);

    emailControl?.setValue('invalid');
    expect(emailControl?.hasError('email')).toBe(true);

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should expose aria-invalid and aria-describedby on an invalid, touched field', () => {
    const emailControl = component.validationForm.get('email');
    emailControl?.setValue('invalid');
    emailControl?.markAsTouched();
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('#valEmailInput');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('valEmailErrors');

    const errors = fixture.nativeElement.querySelector('#valEmailErrors');
    expect(errors.textContent).toContain('Please enter a valid email format.');
  });

  it('should not expose aria-invalid/aria-describedby before the field is touched', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#valEmailInput');
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(input.hasAttribute('aria-describedby')).toBe(false);
  });

  it('should handle form submission when valid', async () => {
    component.validationForm.patchValue({
      username: 'valid_user',
      email: 'user@example.com',
      password: 'password123',
      role: 'developer',
      agreeTerms: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 700));
    fixture.detectChanges();

    component.submitValidationForm();
    expect(component.formSubmitted()).toBe(true);
    expect(component.submittedData()).toEqual(component.validationForm.value);
  });
});
