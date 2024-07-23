import type { Slot } from './slot';

export type WidgetItem = {
  /**
   * The widget name.
   */
  name: string;
  /**
   * Indicates the slot where the widget is placed.
   */
  slot: Slot;
  /**
   * The order of the widget.
   */
  order?: number;
  /**
   * The properties of the widget.
   */
  properties?: Record<string, unknown>;
};
