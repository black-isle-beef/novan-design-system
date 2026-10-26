import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { DsSidebarComponent } from './sidebar.component';

describe('DsSidebarComponent', () => {
  it('marks the active item with aria-current="page"', async () => {
    await TestBed.configureTestingModule({
      imports: [DsSidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsSidebarComponent);
    fixture.componentRef.setInput('items', [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Settings', href: '/settings' },
    ]);
    fixture.detectChanges();

    const activeLink = fixture.nativeElement.querySelector('.ds-sidebar__link--active');
    expect(activeLink?.getAttribute('aria-current')).toBe('page');
  });

  it('renders an internal href via routerLink', async () => {
    await TestBed.configureTestingModule({
      imports: [DsSidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsSidebarComponent);
    fixture.componentRef.setInput('items', [{ label: 'Dashboard', href: '/dashboard' }]);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.ds-sidebar__link') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/dashboard');
  });

  it('points the toggle at its own list with a per-instance id', async () => {
    await TestBed.configureTestingModule({
      imports: [DsSidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const createSidebar = () => {
      const fixture = TestBed.createComponent(DsSidebarComponent);
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();
      return fixture;
    };
    const first = createSidebar();
    const second = createSidebar();

    const firstList = first.nativeElement.querySelector('.ds-sidebar__list') as HTMLElement;
    const secondList = second.nativeElement.querySelector('.ds-sidebar__list') as HTMLElement;
    expect(first.nativeElement.querySelector('.ds-sidebar__toggle').getAttribute('aria-controls')).toBe(firstList.id);
    expect(firstList.id).not.toBe(secondList.id);
  });

  it('keeps each link labelled while the rail is collapsed', async () => {
    await TestBed.configureTestingModule({
      imports: [DsSidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsSidebarComponent);
    fixture.componentRef.setInput('items', [{ label: 'Dashboard', href: '/dashboard', icon: 'bi bi-columns-gap' }]);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.ds-sidebar__toggle').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).not.toContain('ds-sidebar--open');
    expect(fixture.nativeElement.querySelector('.ds-sidebar__link')?.textContent?.trim()).toBe('Dashboard');
  });

  it('emits collapsedChange when the toggle button is clicked', async () => {
    await TestBed.configureTestingModule({
      imports: [DsSidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
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
