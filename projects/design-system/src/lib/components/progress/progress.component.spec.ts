import { TestBed } from '@angular/core/testing';
import { DsProgressComponent } from './progress.component';

describe('DsProgressComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsProgressComponent] }).compileComponents();
    return TestBed.createComponent(DsProgressComponent);
  }

  function getBar(fixture: { nativeElement: HTMLElement }): HTMLElement {
    return fixture.nativeElement.querySelector('.progress-bar') as HTMLElement;
  }

  it('defaults to 0% with min 0 / max 100', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const bar = getBar(fixture);
    expect(bar.getAttribute('role')).toBe('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('0');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
    expect(bar.style.width).toBe('0%');
  });

  it('computes width as a percentage of the min/max range', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('value', 30);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 60);
    fixture.detectChanges();

    expect(getBar(fixture).style.width).toBe('50%');
  });

  it('clamps out-of-range values instead of overflowing the bar', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('value', 999);
    fixture.detectChanges();
    expect(getBar(fixture).style.width).toBe('100%');

    fixture.componentRef.setInput('value', -50);
    fixture.detectChanges();
    expect(getBar(fixture).style.width).toBe('0%');
  });

  it('sets aria-label from the label input', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('label', 'Uploading photo.jpg');
    fixture.detectChanges();

    expect(getBar(fixture).getAttribute('aria-label')).toBe('Uploading photo.jpg');
  });

  it('renders the percentage as visible text only when showValueText is true', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('value', 42);
    fixture.detectChanges();
    expect(getBar(fixture).textContent?.trim()).toBe('');

    fixture.componentRef.setInput('showValueText', true);
    fixture.detectChanges();
    expect(getBar(fixture).textContent?.trim()).toBe('42%');
  });

  it('applies a semantic variant class', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();

    expect(getBar(fixture).classList.contains('bg-success')).toBe(true);
  });
});
