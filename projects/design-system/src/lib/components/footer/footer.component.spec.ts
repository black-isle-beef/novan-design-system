import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { DsFooterComponent } from './footer.component';

describe('DsFooterComponent', () => {
  it('renders the organization name in the copyright line', async () => {
    await TestBed.configureTestingModule({
      imports: [DsFooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsFooterComponent);
    fixture.componentRef.setInput('organizationName', 'Novan Inc.');
    fixture.detectChanges();

    const copyright = fixture.nativeElement.querySelector('.ds-footer__copyright');
    expect(copyright?.textContent).toContain('Novan Inc.');
  });

  it('renders a contentinfo landmark', async () => {
    await TestBed.configureTestingModule({
      imports: [DsFooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsFooterComponent);
    fixture.componentRef.setInput('organizationName', 'Novan Inc.');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="contentinfo"]')).toBeTruthy();
  });

  it('renders internal hrefs via routerLink and external hrefs as plain links', async () => {
    await TestBed.configureTestingModule({
      imports: [DsFooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DsFooterComponent);
    fixture.componentRef.setInput('organizationName', 'Novan Inc.');
    fixture.componentRef.setInput('linkGroups', [
      { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Careers', href: 'https://jobs.example.com' }] },
    ]);
    fixture.detectChanges();

    const links: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('.ds-footer__link'));
    expect(links[0].getAttribute('href')).toBe('/about');
    expect(links[1].getAttribute('href')).toBe('https://jobs.example.com');
  });
});
