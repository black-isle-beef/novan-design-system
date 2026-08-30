import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsFormsComponent } from './forms.component';
import { DsIndeterminateDirective } from './checkboxes/indeterminate.directive';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [DsIndeterminateDirective],
  template: `<input type="checkbox" id="testCheckbox" [dsIndeterminate]="isIndeterminate()">`,
})
class TestHostComponent {
  readonly isIndeterminate = signal(true);
}

describe('DsFormsComponent', () => {
  let component: DsFormsComponent;
  let fixture: ComponentFixture<DsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsFormsComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the forms showcase component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section navigation items', () => {
    expect(component.sections.length).toBe(9);
  });
});

describe('DsIndeterminateDirective', () => {
  it('should set native DOM element indeterminate property', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const checkbox: HTMLInputElement = hostFixture.nativeElement.querySelector('#testCheckbox');
    expect(checkbox.indeterminate).toBe(true);

    hostFixture.componentInstance.isIndeterminate.set(false);
    hostFixture.detectChanges();

    expect(checkbox.indeterminate).toBe(false);
  });
});
