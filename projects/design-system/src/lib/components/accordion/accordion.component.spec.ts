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

  it('lets multiple items be closed at once', async () => {
    const { detailsEls } = await createFixture();
    expect(detailsEls().every((el) => !el.open)).toBe(true);
  });

  it('opening one item closes the others', async () => {
    const { fixture, detailsEls } = await createFixture();
    const [first, second] = detailsEls();

    first.open = true;
    first.dispatchEvent(new Event('toggle'));
    fixture.detectChanges();

    second.open = true;
    second.dispatchEvent(new Event('toggle'));
    fixture.detectChanges();

    const [firstNow, secondNow, thirdNow] = detailsEls();
    expect(firstNow.open).toBe(false);
    expect(secondNow.open).toBe(true);
    expect(thirdNow.open).toBe(false);
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
