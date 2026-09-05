import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsButtonComponent, type DsButtonVariant } from './button.component';

@Component({
  imports: [DsButtonComponent],
  template: '<ds-button [ariaLabel]="ariaLabel"><span dsButtonIcon>+</span>Save changes</ds-button>',
})
class ButtonHostComponent {
  readonly ariaLabel = 'Save changes';
}

describe('DsButtonComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsButtonComponent] }).compileComponents();
    return TestBed.createComponent(DsButtonComponent);
  }

  it('renders a native button with primary medium defaults', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('button');
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn-primary')).toBe(true);
    expect(button.classList.contains('btn-sm')).toBe(false);
    expect(button.classList.contains('btn-lg')).toBe(false);
    expect(button.disabled).toBe(false);
  });

  it.each<DsButtonVariant>([
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
    'hero-light',
    'hero-dark',
  ])(
    'applies the %s variant class',
    async (variant) => {
      const fixture = await createFixture();
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`btn-${variant}`)).toBe(true);
    },
  );

  it.each(['sm', 'md', 'lg'] as const)('applies the %s size class', async (size) => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    const bootstrapSizeClass = size === 'md' ? null : `btn-${size}`;
    expect(bootstrapSizeClass ? button.classList.contains(bootstrapSizeClass) : true).toBe(true);
  });

  it('emits pressed when activated', async () => {
    const fixture = await createFixture();
    fixture.detectChanges();
    let pressed = false;
    fixture.componentInstance.pressed.subscribe(() => (pressed = true));

    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();

    expect(pressed).toBe(true);
  });

  it('disables native interaction and exposes disabled semantics', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    let pressed = false;
    fixture.componentInstance.pressed.subscribe(() => (pressed = true));

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(button.disabled).toBe(true);
    expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('true');
    expect(pressed).toBe(false);
  });

  it('treats loading as disabled and announces loading status', async () => {
    const fixture = await createFixture();
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(fixture.nativeElement.querySelector('.spinner-border')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.visually-hidden')?.textContent).toContain('Loading');
  });

  it('projects an icon and text label while accepting an accessible name override', async () => {
    await TestBed.configureTestingModule({ imports: [ButtonHostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ButtonHostComponent);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Save changes');
    expect(button.querySelector('[dsButtonIcon]')?.textContent).toContain('+');
    expect(button.textContent).toContain('Save changes');
  });
});