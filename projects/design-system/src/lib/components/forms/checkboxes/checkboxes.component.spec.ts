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

  it('exposes the selected code view with aria-pressed, not color alone', () => {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('.card-header .btn-group button'));
    const pressed = () => buttons.slice(0, 3).map((button) => button.getAttribute('aria-pressed'));
    expect(pressed()).toEqual(['true', 'false', 'false']);

    buttons[1].click();
    fixture.detectChanges();

    expect(pressed()).toEqual(['false', 'true', 'false']);
  });

  it('announces copy feedback through a status region', () => {
    const status = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
    expect(status.textContent?.trim()).toBe('');

    component.copied.set(true);
    fixture.detectChanges();

    expect(status.textContent?.trim()).toBe('Copied!');
  });

  it('labels each checkbox group with its visible heading', () => {
    const groups = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('[role="group"]'));
    const labels = groups.map((group) => fixture.nativeElement.querySelector(`#${group.getAttribute('aria-labelledby')}`)?.textContent?.trim());
    expect(labels).toEqual(['Stacked Checkboxes', 'Switch Toggles (.switch)']);
  });

  it('should toggle indeterminate signal state', () => {
    expect(component.isIndeterminate()).toBe(true);
    component.toggleIndeterminate();
    expect(component.isIndeterminate()).toBe(false);
  });
});
