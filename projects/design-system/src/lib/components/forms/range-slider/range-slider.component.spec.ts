import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsRangeSliderComponent } from './range-slider.component';

describe('DsRangeSliderComponent', () => {
  let component: DsRangeSliderComponent;
  let fixture: ComponentFixture<DsRangeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsRangeSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should synchronize range control value changes to rangeValue signal', () => {
    component.rangeControl.setValue(85);
    expect(component.rangeValue()).toBe(85);
  });
});
