import { TestBed } from '@angular/core/testing';
import { DsSpinnerComponent } from './spinner.component';

describe('DsSpinnerComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsSpinnerComponent] }).compileComponents();
    return TestBed.createComponent(DsSpinnerComponent);
  }

  it('renders role="status" with a visually-hidden "Loading" label by default', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('role')).toBe('status');
    expect(fixture.nativeElement.querySelector('.visually-hidden')?.textContent).toBe('Loading');
  });

  it('reflects a custom label', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('label', 'Saving changes');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.visually-hidden')?.textContent).toBe('Saving changes');
  });

  it('applies the small-size modifier class only when requested', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('spinner-border-sm')).toBe(false);

    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('spinner-border-sm')).toBe(true);
  });
});
