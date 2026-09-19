import { TestBed } from '@angular/core/testing';
import { DsPaginationComponent } from './pagination.component';

describe('DsPaginationComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsPaginationComponent] }).compileComponents();
    return TestBed.createComponent(DsPaginationComponent);
  }

  it('renders a nav landmark with the given aria-label', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 5);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('nav')?.getAttribute('aria-label')).toBe('Pagination');
  });

  it('lists every page when the total fits without truncation', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 5);
    fixture.detectChanges();

    const labels = fixture.nativeElement.querySelectorAll('.page-item:not(.disabled) [aria-label^="Page "]');
    expect(labels.length).toBe(5);
    expect(fixture.nativeElement.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('marks the current page with aria-current="page" and the active class', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('page', 3);
    fixture.detectChanges();

    const current = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLButtonElement;
    expect(current.textContent?.trim()).toBe('3');
    expect(current.closest('.page-item')?.classList.contains('active')).toBe(true);
  });

  it('disables Previous on the first page and Next on the last page', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('page', 1);
    fixture.detectChanges();

    const previous = fixture.nativeElement.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    const next = fixture.nativeElement.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);

    fixture.componentRef.setInput('page', 5);
    fixture.detectChanges();
    expect(previous.disabled).toBe(false);
    expect(next.disabled).toBe(true);
  });

  it('emits pageChange when a page number is clicked', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('page', 1);
    fixture.detectChanges();

    let emitted: number | undefined;
    fixture.componentInstance.pageChange.subscribe((value: number) => (emitted = value));

    const page3 = Array.from(fixture.nativeElement.querySelectorAll('.page-link')).find(
      (el) => el.textContent?.trim() === '3',
    ) as HTMLButtonElement;
    page3.click();

    expect(emitted).toBe(3);
  });

  it('emits pageChange(page + 1) when Next is clicked', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('page', 2);
    fixture.detectChanges();

    let emitted: number | undefined;
    fixture.componentInstance.pageChange.subscribe((value: number) => (emitted = value));

    (fixture.nativeElement.querySelector('[aria-label="Next page"]') as HTMLButtonElement).click();

    expect(emitted).toBe(3);
  });

  it('truncates a long page range with ellipses around the current page', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 20);
    fixture.componentRef.setInput('page', 10);
    fixture.detectChanges();

    const items = Array.from(fixture.nativeElement.querySelectorAll('.page-item')).map((el) => el.textContent?.trim());
    // Previous, 1, …, 9, 10, 11, …, 20, Next
    expect(items).toEqual(['«', '1', '…', '9', '10', '11', '…', '20', '»']);
  });

  it('never emits pageChange when Previous/Next is disabled at a boundary', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('page', 1);
    fixture.detectChanges();

    let emitted = false;
    fixture.componentInstance.pageChange.subscribe(() => (emitted = true));

    // The button is natively disabled, so this simulates what a real click would (not) do.
    const previous = fixture.nativeElement.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
    previous.click();

    expect(emitted).toBe(false);
  });
});
