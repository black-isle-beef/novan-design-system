import { afterEach, vi } from 'vitest';

/**
 * Restores every `vi.spyOn`/`vi.fn` mock after each test. Several specs spy on
 * shared global prototypes (e.g. `HTMLDialogElement.prototype.showModal`); without
 * this, a spy installed in one test stays installed on the prototype for every
 * later test in the file, so an unrelated component instance calling the native
 * method routes through a previous test's spy and inflates its call count.
 */
afterEach(() => {
  vi.restoreAllMocks();
});

/**
 * Global Vitest setup for the design-system test target.
 *
 * jsdom (the DOM implementation used by the `@angular/build:unit-test` Vitest
 * runner) does not implement `HTMLDialogElement.prototype.showModal`/`close`/
 * `show` — see https://github.com/jsdom/jsdom/issues/3294. Components such as
 * `DsModalComponent` and `DsOffcanvasComponent` call these methods directly on
 * the native `<dialog>` element, which is correct behavior for real browsers.
 * Without this polyfill every spec that spies on or exercises those methods
 * (via `vi.spyOn(HTMLDialogElement.prototype, 'showModal')`, etc.) fails
 * because the method doesn't exist to spy on.
 *
 * This file only registers the polyfill when the method is missing, so it is
 * a no-op wherever a real implementation (jsdom fixes it, or a browser-based
 * runner) is already present.
 */
if (typeof HTMLDialogElement !== 'undefined' && typeof HTMLDialogElement.prototype.showModal !== 'function') {
  const closeDialog = function (this: HTMLDialogElement, returnValue?: string): void {
    if (!this.hasAttribute('open')) {
      return;
    }
    if (returnValue !== undefined) {
      this.returnValue = returnValue;
    }
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };

  Object.defineProperties(HTMLDialogElement.prototype, {
    returnValue: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: '',
    },
    show: {
      configurable: true,
      writable: true,
      value(this: HTMLDialogElement): void {
        this.setAttribute('open', '');
      },
    },
    showModal: {
      configurable: true,
      writable: true,
      value(this: HTMLDialogElement): void {
        this.setAttribute('open', '');
      },
    },
    close: {
      configurable: true,
      writable: true,
      value: closeDialog,
    },
  });
}
