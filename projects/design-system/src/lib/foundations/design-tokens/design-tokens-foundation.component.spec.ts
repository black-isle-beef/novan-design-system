import { TestBed } from '@angular/core/testing';
import { DsDesignTokensFoundationComponent } from './design-tokens-foundation.component';

describe('DsDesignTokensFoundationComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [DsDesignTokensFoundationComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsDesignTokensFoundationComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders cards for every token category by default', async () => {
    const fixture = await setup();
    const sections = fixture.nativeElement.querySelectorAll('.ds-dt__section');
    // 7 category sections + the code-export section.
    expect(sections.length).toBe(8);
    expect(fixture.nativeElement.querySelectorAll('.ds-dt__card').length).toBeGreaterThan(20);
  });

  it('filters tokens by category chip', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    component.setCategory('zindex');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.ds-dt__zindex-chip').length).toBe(5);
    expect(fixture.nativeElement.querySelector('.ds-dt__swatch')).toBeFalsy();
  });

  it('filters tokens by search term across variable name and usage', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    component.setSearchTerm('--z-modal');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.ds-dt__card').length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('--z-modal');
    expect(fixture.nativeElement.textContent).toContain('$z-modal');
  });

  it('recalculates semantic color values when the theme is toggled', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    expect(component.theme()).toBe('light');
    component.toggleTheme();
    fixture.detectChanges();

    expect(component.theme()).toBe('dark');
    expect(fixture.componentInstance.resolveValue({ value: '#ffffff', darkValue: '#111827' } as any)).toBe(
      '#111827',
    );
  });

  it('generates CSS, SCSS, Bootstrap Sass-map, and JSON export code', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    expect(component.exportedCode()).toContain(':root {');

    component.setExportFormat('scss');
    fixture.detectChanges();
    expect(component.exportedCode()).toContain('$space-1: 4px;');

    component.setExportFormat('bootstrap');
    fixture.detectChanges();
    expect(component.exportedCode()).toContain('$ds-color-semantic: (');

    component.setExportFormat('json');
    fixture.detectChanges();
    expect(() => JSON.parse(component.exportedCode())).not.toThrow();
  });

  it('copies a token variable and value to the clipboard', async () => {
    const fixture = await setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    await fixture.componentInstance.copyText('--space-1', '--space-1::var');

    expect(writeText).toHaveBeenCalledWith('--space-1');
    expect(fixture.componentInstance.copiedKey()).toBe('--space-1::var');
  });

  it('copies a token SCSS variable to the clipboard', async () => {
    const fixture = await setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    await fixture.componentInstance.copyText('$space-1', '--space-1::scss');

    expect(writeText).toHaveBeenCalledWith('$space-1');
    expect(fixture.componentInstance.copiedKey()).toBe('--space-1::scss');
  });
});
