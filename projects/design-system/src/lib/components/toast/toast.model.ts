/** Semantic status conveyed by a toast; also selects its accent color and icon. */
export type DsToastVariant = 'success' | 'warning' | 'danger' | 'info';

/** Screen corner a `DsToastContainerComponent` stacks its toasts in. */
export type DsToastPosition = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface DsToastOptions {
  /** Optional bold lead-in rendered above the message. */
  readonly title?: string | null;
  readonly variant?: DsToastVariant;
  /** Auto-dismiss delay in ms. `null` (or omitted with a falsy override) disables auto-dismiss. */
  readonly duration?: number | null;
  /** Whether the toast renders a close button and can be dismissed early. */
  readonly dismissible?: boolean;
}

export interface DsToastMessage {
  readonly id: string;
  readonly message: string;
  readonly title: string | null;
  readonly variant: DsToastVariant;
  readonly duration: number | null;
  readonly dismissible: boolean;
}
