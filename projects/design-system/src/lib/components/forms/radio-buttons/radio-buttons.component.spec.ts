import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsRadioButtonsComponent } from './radio-buttons.component';

describe('DsRadioButtonsComponent', () => {
  let component: DsRadioButtonsComponent;
  let fixture: ComponentFixture<DsRadioButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsRadioButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsRadioButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
