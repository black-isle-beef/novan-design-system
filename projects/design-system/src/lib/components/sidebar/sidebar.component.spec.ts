import { TestBed } from '@angular/core/testing';
import { DsSidebarComponent } from './sidebar.component';

describe('DsSidebarComponent', () => {
  it('marks the active item with aria-current="page"', async () => {
    await TestBed.configureTestingModule({ imports: [DsSidebarComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsSidebarComponent);
    fixture.componentRef.setInput('items', [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Settings', href: '/settings' },
    ]);
    fixture.detectChanges();

    const activeLink = fixture.nativeElement.querySelector('.ds-sidebar__link--active');
    expect(activeLink?.getAttribute('aria-current')).toBe('page');
  });

  it('emits collapsedChange when the toggle button is clicked', async () => {
    await TestBed.configureTestingModule({ imports: [DsSidebarComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsSidebarComponent);
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();

    let emitted: boolean | undefined;
    fixture.componentInstance.collapsedChange.subscribe((value: boolean) => (emitted = value));

    fixture.nativeElement.querySelector('.ds-sidebar__toggle').click();
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });
});
