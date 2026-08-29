import { TestBed } from '@angular/core/testing';
import { DsHeroComponent } from './hero.component';

describe('DsHeroComponent', () => {
  it('renders the required heading', async () => {
    await TestBed.configureTestingModule({ imports: [DsHeroComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsHeroComponent);
    fixture.componentRef.setInput('heading', 'Build faster with tokens');
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Build faster with tokens');
  });

  it('applies the requested background variant class', async () => {
    await TestBed.configureTestingModule({ imports: [DsHeroComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsHeroComponent);
    fixture.componentRef.setInput('heading', 'Hero');
    fixture.componentRef.setInput('variant', 'dark');
    fixture.detectChanges();

    const region = fixture.nativeElement.querySelector('section');
    expect(region?.classList.contains('ds-hero--dark')).toBe(true);
  });
});
