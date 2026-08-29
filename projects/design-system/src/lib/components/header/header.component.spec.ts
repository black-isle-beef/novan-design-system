import { TestBed } from '@angular/core/testing';
import { DsHeaderComponent } from './header.component';

describe('DsHeaderComponent', () => {
  it('renders a banner landmark and forwards nav items', async () => {
    await TestBed.configureTestingModule({ imports: [DsHeaderComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsHeaderComponent);
    fixture.componentRef.setInput('navItems', [{ label: 'Home', href: '/' }]);
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('[role="banner"]');
    expect(banner).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ds-main-nav')).toBeTruthy();
  });
});
