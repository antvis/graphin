import type { WidgetItem } from '../types';

const WIDGET_REGISTRY: { [key: string]: React.FC<any> } = {};

export const BuiltInWidgets: WidgetItem[] = [];

/**
 * Register a new widget
 * @param name - widget name
 * @param widget - widget component
 * @param override - whether to override existing widget with the same name
 */
export function registerWidget(name: string, widget: React.FC<any>, override = false) {
  if (!override && name in WIDGET_REGISTRY) {
    // eslint-disable-next-line no-console
    console.warn(`Widget with name ${name} already exists. Use override flag to replace it.`);
  } else {
    WIDGET_REGISTRY[name] = widget;
  }
}

/**
 * Get a widget by name
 * @param name - widget name
 * @returns widget component
 */
export function getWidget(name: string): React.FC<any> | undefined {
  return WIDGET_REGISTRY[name];
}
