import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DsToastComponent } from './toast.component';
import type { DsToastPosition } from './toast.model';
import { DsToastService } from './toast.service';

/**
 * Fixed-corner stack that renders whatever `DsToastService` has queued. Place
 * one instance near the root of an application; components elsewhere inject
 * `DsToastService` and call `show()`/`success()`/`warning()`/`danger()`/`info()`
 * to raise a toast without any direct reference to this container.
 */
@Component({
  selector: 'ds-toast-container',
  standalone: true,
  imports: [DsToastComponent],
  templateUrl: './toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-toast-container',
    '[class.ds-toast-container--top-start]': "position() === 'top-start'",
    '[class.ds-toast-container--top-end]': "position() === 'top-end'",
    '[class.ds-toast-container--bottom-start]': "position() === 'bottom-start'",
    '[class.ds-toast-container--bottom-end]': "position() === 'bottom-end'",
  },
})
export class DsToastContainerComponent {
  /** Screen corner the toast stack anchors to. */
  readonly position = input<DsToastPosition>('bottom-end');

  protected readonly toastService = inject(DsToastService);
}
