import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTextInputComponent } from './text-input.component';

describe('DsTextInputComponent', () => {
  let component: DsTextInputComponent;
  let fixture: ComponentFixture<DsTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility signal', () => {
    expect(component.showPassword()).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword()).toBe(true);
  });

  it('exposes the password visibility toggle state with aria-pressed', () => {
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-controls="passwordToggleInput"]');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelector('#passwordToggleInput').getAttribute('type')).toBe('text');
  });

  it('names every text field, including the ngModel demo without a <label>', () => {
    const fields = Array.from<HTMLInputElement>(fixture.nativeElement.querySelectorAll('input.form-control'));
    for (const field of fields) {
      const labelled = !!fixture.nativeElement.querySelector(`label[for="${field.id}"]`) || field.hasAttribute('aria-labelledby');
      expect(labelled).toBe(true);
    }
    const keyword = fields.find((field) => field.hasAttribute('aria-labelledby'))!;
    expect(fixture.nativeElement.querySelector(`#${keyword.getAttribute('aria-labelledby')}`)?.textContent?.trim()).toBe(
      'ngModel Dual-Binding Context',
    );
  });
});
