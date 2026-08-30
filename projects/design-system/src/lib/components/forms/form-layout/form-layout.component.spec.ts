import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsFormLayoutComponent } from './form-layout.component';

describe('DsFormLayoutComponent', () => {
  let component: DsFormLayoutComponent;
  let fixture: ComponentFixture<DsFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsFormLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
