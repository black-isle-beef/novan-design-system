import { Directive, ElementRef, effect, inject, input } from '@angular/core';

/**
 * Directs an `<input type="checkbox">` element to reflect an indeterminate
 * checkbox visual state via its native `indeterminate` DOM property.
 */
@Directive({
  selector: '[dsIndeterminate]',
  standalone: true,
})
export class DsIndeterminateDirective {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /** Whether the checkbox DOM element should set `indeterminate = true`. */
  readonly dsIndeterminate = input(false);

  constructor() {
    effect(() => {
      this.elementRef.nativeElement.indeterminate = this.dsIndeterminate();
    });
  }
}
