import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsCheckboxesComponent } from './checkboxes.component';

describe('DsCheckboxesComponent', () => {
  let component: DsCheckboxesComponent;
  let fixture: ComponentFixture<DsCheckboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCheckboxesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle indeterminate signal state', () => {
    expect(component.isIndeterminate()).toBe(true);
    component.toggleIndeterminate();
    expect(component.isIndeterminate()).toBe(false);
  });
});
