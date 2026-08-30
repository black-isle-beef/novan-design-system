import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsInputGroupComponent } from './input-group.component';

describe('DsInputGroupComponent', () => {
  let component: DsInputGroupComponent;
  let fixture: ComponentFixture<DsInputGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsInputGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
