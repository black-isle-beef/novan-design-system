import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsAccordionComponent } from './accordion.component';
import { DsAccordionItemComponent } from './accordion-item.component';

@Component({
  standalone: true,
  imports: [DsAccordionComponent, DsAccordionItemComponent],
  template: `
    <ds-accordion>
      <ds-accordion-item summary="First"><p>First body</p></ds-accordion-item>
      <ds-accordion-item summary="Second"><p>Second body</p></ds-accordion-item>
      <ds-accordion-item summary="Third"><p>Third body</p></ds-accordion-item>
    </ds-accordion>
  `,
})
class HostComponent {}

describe('DsAccordionComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const detailsEls = () => Array.from(fixture.nativeElement.querySelectorAll('details')) as HTMLDetailsElement[];
    return { fixture, detailsEls };
  }

  // The browser closes the other members of a `<details name>` group itself;
  // jsdom doesn't, so that behavior is covered by the Playwright suite.
  it('renders a Bootstrap .accordion whose items share one <details name>', async () => {
    const { fixture, detailsEls } = await createFixture();
    const host = fixture.nativeElement.querySelector('ds-accordion') as HTMLElement;
    const names = detailsEls().map((el) => el.getAttribute('name'));

    expect(host.classList).toContain('accordion');
    expect(names[0]).toMatch(/^ds-accordion-\d+$/);
    expect(new Set(names).size).toBe(1);
    // The wrapper owns the tokens, so the items don't redeclare them.
    expect(fixture.nativeElement.querySelector('ds-accordion-item').classList).not.toContain('accordion');
  });

  it('lets multiple items be closed at once', async () => {
    const { detailsEls } = await createFixture();
    expect(detailsEls().every((el) => !el.open)).toBe(true);
  });

  it('closing the only open item leaves all items closed', async () => {
    const { fixture, detailsEls } = await createFixture();
    const [first] = detailsEls();

    first.open = true;
    first.dispatchEvent(new Event('toggle'));
    fixture.detectChanges();

    first.open = false;
    first.dispatchEvent(new Event('toggle'));
    fixture.detectChanges();

    expect(detailsEls().every((el) => !el.open)).toBe(true);
  });
});
