import { TestBed } from '@angular/core/testing';
import { DsLayoutFoundationComponent } from './layout-foundation.component';

describe('DsLayoutFoundationComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [DsLayoutFoundationComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsLayoutFoundationComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the full 12-column grid', async () => {
    const fixture = await setup();
    expect(fixture.nativeElement.querySelectorAll('.ds-lf__grid-col').length).toBe(12);
  });

  it('switches navigation pattern preview when a tab is selected', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;
    expect(fixture.nativeElement.querySelector('.ds-lf__wire-header')).toBeTruthy();

    component.selectNavPattern('sidebar');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ds-lf__wire-sidebar')).toBeTruthy();
  });

  it('switches to the code tab and shows the raw HTML/CSS snippets', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    component.setNavTab('code');
    fixture.detectChanges();

    const blocks = fixture.nativeElement.querySelectorAll('.ds-lf__code');
    expect(blocks.length).toBe(2);
    expect(blocks[0].textContent).toContain('site-header');
  });

  it('applies the selected viewport width to the preview frame', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    component.setViewport('mobile');
    fixture.detectChanges();

    const frame = fixture.nativeElement.querySelector('.ds-lf__preview-frame') as HTMLElement;
    expect(frame.style.maxWidth).toBe('375px');
  });

  it('copies the active snippet to the clipboard', async () => {
    const fixture = await setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    await fixture.componentInstance.copyCode('.foo { color: red; }', 'top-css');

    expect(writeText).toHaveBeenCalledWith('.foo { color: red; }');
    expect(fixture.componentInstance.copiedKey()).toBe('top-css');
  });
});
