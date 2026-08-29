import { TestBed } from '@angular/core/testing';
import { DsFooterComponent } from './footer.component';

describe('DsFooterComponent', () => {
  it('renders the organization name in the copyright line', async () => {
    await TestBed.configureTestingModule({ imports: [DsFooterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsFooterComponent);
    fixture.componentRef.setInput('organizationName', 'Novan Inc.');
    fixture.detectChanges();

    const copyright = fixture.nativeElement.querySelector('.ds-footer__copyright');
    expect(copyright?.textContent).toContain('Novan Inc.');
  });

  it('renders a contentinfo landmark', async () => {
    await TestBed.configureTestingModule({ imports: [DsFooterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsFooterComponent);
    fixture.componentRef.setInput('organizationName', 'Novan Inc.');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="contentinfo"]')).toBeTruthy();
  });
});
