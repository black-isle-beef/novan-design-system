import { TestBed } from '@angular/core/testing';
import { DsBreadcrumbComponent } from './breadcrumb.component';

describe('DsBreadcrumbComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsBreadcrumbComponent] }).compileComponents();
    return TestBed.createComponent(DsBreadcrumbComponent);
  }

  it('renders preceding items as links and the last item as the current page', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('items', [
      { label: 'Home', href: '/', icon: 'bi bi-house' },
      { label: 'Products', href: '/products' },
      { label: 'Widgets' },
    ]);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('.ds-breadcrumb__link');
    expect(links.length).toBe(2);

    const current = fixture.nativeElement.querySelector('.ds-breadcrumb__current');
    expect(current?.textContent?.trim()).toContain('Widgets');
  });

  it('marks the last item with aria-current="page" and renders it without a link', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('items', [
      { label: 'Home', href: '/' },
      { label: 'Current page' },
    ]);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.ds-breadcrumb__item');
    const lastItem = items[items.length - 1] as HTMLElement;
    expect(lastItem.getAttribute('aria-current')).toBe('page');
    expect(lastItem.querySelector('a')).toBeNull();
  });

  it('renders a leading icon for items that provide one', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('items', [
      { label: 'Home', href: '/', icon: 'bi bi-house' },
      { label: 'Current page' },
    ]);
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.ds-breadcrumb__link .ds-breadcrumb__icon');
    expect(icon?.className).toContain('bi-house');
  });
});
