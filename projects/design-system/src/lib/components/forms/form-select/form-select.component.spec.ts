import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsFormSelectComponent } from './form-select.component';

describe('DsFormSelectComponent', () => {
  let component: DsFormSelectComponent;
  let fixture: ComponentFixture<DsFormSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsFormSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
