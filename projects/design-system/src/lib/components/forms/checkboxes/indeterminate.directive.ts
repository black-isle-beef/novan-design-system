import { Directive, ElementRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

/**
 * Directs an `<input type="checkbox">` element to reflect an indeterminate
 * checkbox visual state via its native `indeterminate` DOM property.
 */
@Directive({
  selector: '[dsIndeterminate]',
  standalone: true,
})
export class DsIndeterminateDirective implements OnChanges {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /** Whether the checkbox DOM element should set `indeterminate = true`. */
  @Input() dsIndeterminate = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('dsIndeterminate' in changes) {
      this.elementRef.nativeElement.indeterminate = this.dsIndeterminate;
    }
  }
}