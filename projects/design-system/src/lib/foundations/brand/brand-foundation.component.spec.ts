import { TestBed } from '@angular/core/testing';
import { DsBrandFoundationComponent } from './brand-foundation.component';

describe('DsBrandFoundationComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [DsBrandFoundationComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsBrandFoundationComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders every palette family as a swatch group', async () => {
    const fixture = await setup();
    const headings = fixture.nativeElement.querySelectorAll('.ds-bf__family-title');
    expect(headings.length).toBe(7);
  });

  it('applies the default role colors to the live demo theme vars', async () => {
    const fixture = await setup();
    const demo = fixture.nativeElement.querySelector('.ds-bf__demo') as HTMLElement;
    expect(demo.style.getPropertyValue('--ds-primary')).toBe('#0a2f73');
    expect(demo.style.getPropertyValue('--ds-secondary')).toBe('#2f1778');
  });

  it('opens the assignment modal and applies a new role selection', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;

    component.openAssignment();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ds-bf__modal')).toBeTruthy();

    component.onDraftChange('primary', { target: { value: 'purple::1' } } as unknown as Event);
    component.applyAssignment();
    fixture.detectChanges();

    const demo = fixture.nativeElement.querySelector('.ds-bf__demo') as HTMLElement;
    expect(demo.style.getPropertyValue('--ds-primary')).toBe('#22114a');
    expect(fixture.nativeElement.querySelector('.ds-bf__modal')).toBeFalsy();
  });

  it('copies a hex value to the clipboard', async () => {
    const fixture = await setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    await fixture.componentInstance.copyHex('#ffffff');

    expect(writeText).toHaveBeenCalledWith('#ffffff');
    expect(fixture.componentInstance.copiedHex()).toBe('#ffffff');
  });
});
