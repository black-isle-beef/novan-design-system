import { Injectable, signal } from '@angular/core';
import type { DsToastMessage, DsToastOptions } from './toast.model';

const DEFAULT_DURATION_MS = 5000;

let nextToastId = 0;

/**
 * Signal-driven toast queue. Injected wherever a toast should be raised and
 * read by `DsToastContainerComponent`, which renders whatever is queued.
 * Auto-dismiss timers pause while a toast has pointer or keyboard focus and
 * resume with whatever time was left when it's released.
 */
@Injectable({ providedIn: 'root' })
export class DsToastService {
  private readonly toastsState = signal<readonly DsToastMessage[]>([]);
  readonly toasts = this.toastsState.asReadonly();

  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly remainingMs = new Map<string, number>();
  private readonly startedAt = new Map<string, number>();

  /** Queues a toast and returns its id, for use with `dismiss()`. */
  show(message: string, options: DsToastOptions = {}): string {
    const id = `ds-toast-${nextToastId++}`;
    const duration = options.duration === undefined ? DEFAULT_DURATION_MS : options.duration;
    const toast: DsToastMessage = {
      id,
      message,
      title: options.title ?? null,
      variant: options.variant ?? 'info',
      duration,
      dismissible: options.dismissible ?? true,
    };

    this.toastsState.update((toasts) => [...toasts, toast]);
    this.scheduleAutoDismiss(id, duration);
    return id;
  }

  success(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'success' });
  }

  warning(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'warning' });
  }

  danger(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'danger' });
  }

  info(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'info' });
  }

  dismiss(id: string): void {
    this.clearTimer(id);
    this.remainingMs.delete(id);
    this.startedAt.delete(id);
    this.toastsState.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  /** Dismisses every queued toast. */
  clear(): void {
    for (const toast of this.toastsState()) {
      this.clearTimer(toast.id);
    }
    this.remainingMs.clear();
    this.startedAt.clear();
    this.toastsState.set([]);
  }

  /** Pauses a toast's auto-dismiss timer; call on pointer/focus entering the toast. */
  pause(id: string): void {
    const startedAt = this.startedAt.get(id);
    if (startedAt === undefined || !this.timers.has(id)) {
      return;
    }
    this.clearTimer(id);
    const elapsed = Date.now() - startedAt;
    const scheduledFor = this.remainingMs.get(id) ?? 0;
    this.remainingMs.set(id, Math.max(scheduledFor - elapsed, 0));
  }

  /** Resumes a paused toast's auto-dismiss timer with its remaining time; call on pointer/focus leaving. */
  resume(id: string): void {
    const remaining = this.remainingMs.get(id);
    if (remaining === undefined) {
      return;
    }
    this.scheduleAutoDismiss(id, remaining);
  }

  private scheduleAutoDismiss(id: string, duration: number | null): void {
    if (duration === null || duration <= 0) {
      return;
    }
    this.remainingMs.set(id, duration);
    this.startedAt.set(id, Date.now());
    this.timers.set(
      id,
      setTimeout(() => this.dismiss(id), duration),
    );
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }
}
