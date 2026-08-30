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
});
