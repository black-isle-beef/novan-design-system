import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsControlSizesComponent } from './control-sizes.component';

describe('DsControlSizesComponent', () => {
  let component: DsControlSizesComponent;
  let fixture: ComponentFixture<DsControlSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsControlSizesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsControlSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
