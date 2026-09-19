import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsCardComponent } from './card.component';

@Component({
  standalone: true,
  imports: [DsCardComponent],
  template: `
    <ds-card [hoverable]="hoverable">
      @if (withMedia) {
        <img dsCardMedia src="/card-example-amber-glass.jpg" alt="" />
      }
      @if (withHeader) {
        <h3 dsCardHeader>Card title</h3>
      }
      <p>Card body content.</p>
      @if (withFooter) {
        <button dsCardFooter type="button">Action</button>
      }
    </ds-card>
  `,
})
class HostComponent {
  hoverable = false;
  withMedia = false;
  withHeader = false;
  withFooter = false;
}

describe('DsCardComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    return fixture;
  }

  it('renders the projected body content', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ds-card__body')?.textContent).toContain('Card body content.');
  });

  it('leaves the header, media, and footer regions empty when nothing is projected into them', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('ds-card');
    expect(card.querySelector('.ds-card__header')?.textContent?.trim()).toBe('');
    expect(card.querySelector('.ds-card__media')?.textContent?.trim()).toBe('');
    expect(card.querySelector('.ds-card__footer')?.textContent?.trim()).toBe('');
  });

  it('renders projected media, header, and footer content', async () => {
    const fixture = await createFixture();
    fixture.componentInstance.withMedia = true;
    fixture.componentInstance.withHeader = true;
    fixture.componentInstance.withFooter = true;
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('ds-card');
    expect(card.querySelector('.ds-card__media img')).toBeTruthy();
    expect(card.querySelector('.ds-card__header')?.textContent).toContain('Card title');
    expect(card.querySelector('.ds-card__footer button')?.textContent).toContain('Action');
  });

  it('reflects the hoverable input as a host class', async () => {
    const fixture = await createFixture();
    fixture.componentInstance.hoverable = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ds-card').classList.contains('ds-card--hoverable')).toBe(true);
  });

  it('omits the hoverable class by default', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ds-card').classList.contains('ds-card--hoverable')).toBe(false);
  });
});
