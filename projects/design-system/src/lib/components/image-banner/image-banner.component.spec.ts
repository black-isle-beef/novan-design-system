import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsImageBannerComponent } from './image-banner.component';

@Component({
  standalone: true,
  imports: [DsImageBannerComponent],
  template: `
    <ds-image-banner
      [imageSrc]="src()"
      [imageAlt]="alt()"
      [layout]="layout()"
      [imagePosition]="position()"
      [heading]="heading()"
      [rounded]="rounded()"
      [cornerStyle]="cornerStyle()"
      [ctaPosition]="ctaPosition()"
    >
      <p class="projected">Projected body copy</p>
      <a class="cta" dsImageBannerCta href="#">Get started</a>
    </ds-image-banner>
  `,
})
class HostComponent {
  src = signal('/example.jpg');
  alt = signal('');
  layout = signal<'split' | 'image'>('split');
  position = signal<'left' | 'right'>('left');
  heading = signal<string | undefined>(undefined);
  rounded = signal(true);
  cornerStyle = signal<'pill' | 'sweep'>('pill');
  ctaPosition = signal<'start' | 'center' | 'end'>('center');
}

describe('DsImageBannerComponent', () => {
  async function render() {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('ds-image-banner') as HTMLElement;
    return { fixture, host };
  }

  it('renders the image with the provided src and defaults to image-left, rounded', async () => {
    const { host } = await render();
    const img = host.querySelector('img.ds-image-banner__image') as HTMLImageElement;

    expect(img.getAttribute('src')).toBe('/example.jpg');
    expect(host.classList.contains('ds-image-banner--layout-split')).toBe(true);
    expect(host.classList.contains('ds-image-banner--image-left')).toBe(true);
    expect(host.classList.contains('ds-image-banner--rounded')).toBe(true);
    expect(host.classList.contains('ds-image-banner--pill')).toBe(true);
  });

  it('treats an empty imageAlt as decorative', async () => {
    const { host } = await render();
    const img = host.querySelector('img.ds-image-banner__image') as HTMLImageElement;

    expect(img.getAttribute('alt')).toBe('');
  });

  it('applies a descriptive alt when imageAlt is set', async () => {
    const { fixture, host } = await render();
    fixture.componentInstance.alt.set('Team collaborating at a whiteboard');
    fixture.detectChanges();

    const img = host.querySelector('img.ds-image-banner__image') as HTMLImageElement;
    expect(img.getAttribute('alt')).toBe('Team collaborating at a whiteboard');
  });

  it('switches to image-right when requested', async () => {
    const { fixture, host } = await render();
    fixture.componentInstance.position.set('right');
    fixture.detectChanges();

    expect(host.classList.contains('ds-image-banner--image-right')).toBe(true);
    expect(host.classList.contains('ds-image-banner--image-left')).toBe(false);
  });

  it('drops the rounded and corner-style classes when rounded is false', async () => {
    const { fixture, host } = await render();
    fixture.componentInstance.rounded.set(false);
    fixture.detectChanges();

    expect(host.classList.contains('ds-image-banner--rounded')).toBe(false);
    expect(host.classList.contains('ds-image-banner--pill')).toBe(false);
    expect(host.classList.contains('ds-image-banner--sweep')).toBe(false);
  });

  it('swaps the pill class for the sweep class when cornerStyle is "sweep"', async () => {
    const { fixture, host } = await render();
    fixture.componentInstance.cornerStyle.set('sweep');
    fixture.detectChanges();

    expect(host.classList.contains('ds-image-banner--sweep')).toBe(true);
    expect(host.classList.contains('ds-image-banner--pill')).toBe(false);
    expect(host.classList.contains('ds-image-banner--rounded')).toBe(true);
  });

  it('renders no heading and no region label by default', async () => {
    const { host } = await render();
    const section = host.querySelector('section.ds-image-banner__layout') as HTMLElement;

    expect(host.querySelector('h2')).toBeNull();
    expect(section.hasAttribute('aria-labelledby')).toBe(false);
  });

  it('labels the region with the heading when one is provided', async () => {
    const { fixture, host } = await render();
    fixture.componentInstance.heading.set('Built for teams that ship');
    fixture.detectChanges();

    const heading = host.querySelector('h2.ds-image-banner__heading') as HTMLElement;
    const section = host.querySelector('section.ds-image-banner__layout') as HTMLElement;

    expect(heading.textContent).toContain('Built for teams that ship');
    expect(heading.id).toBeTruthy();
    expect(section.getAttribute('aria-labelledby')).toBe(heading.id);
  });

  it('projects body content into the panel', async () => {
    const { host } = await render();
    const projected = host.querySelector('.ds-image-banner__panel-content .projected');

    expect(projected?.textContent).toContain('Projected body copy');
  });

  it('drops the panel and overlays the CTA in the image layout', async () => {
    const { fixture, host } = await render();
    fixture.componentInstance.layout.set('image');
    fixture.componentInstance.heading.set('Ignored in image layout');
    fixture.detectChanges();

    const section = host.querySelector('section.ds-image-banner__layout') as HTMLElement;

    expect(host.classList.contains('ds-image-banner--layout-image')).toBe(true);
    expect(host.querySelector('.ds-image-banner__panel')).toBeNull();
    expect(host.querySelector('h2')).toBeNull();
    expect(section.hasAttribute('aria-labelledby')).toBe(false);
    expect(host.querySelector('.ds-image-banner__cta .cta')?.textContent).toContain('Get started');
  });

  it('reflects ctaPosition as a host class', async () => {
    const { fixture, host } = await render();
    fixture.componentInstance.layout.set('image');
    fixture.componentInstance.ctaPosition.set('end');
    fixture.detectChanges();

    expect(host.classList.contains('ds-image-banner--cta-end')).toBe(true);
    expect(host.classList.contains('ds-image-banner--cta-center')).toBe(false);
  });
});
