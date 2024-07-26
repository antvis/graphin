import type { WidgetSchema } from '../spec';
import type { ID } from '../types';
import { BaseState } from './base-state';
import { WidgetStoreEvent } from './constants';

type WidgetState = Map<ID, WidgetSchema>;

export class WidgetStore extends BaseState<WidgetState> {
  protected state: WidgetState = new Map();

  public setWidgets(widgets: WidgetSchema[]) {
    widgets.forEach((widget) => this.setWidget(widget));
  }

  public setWidget(widget: WidgetSchema) {
    this.state.set(widget.id, widget);
  }

  public setWidgetProperties<Properties extends Record<string, unknown> = Record<string, unknown>>(
    widgetId: ID,
    properties: Properties,
  ) {
    const widget = this.getWidget(widgetId);
    if (widget) {
      widget.properties = { ...widget.properties, ...properties };
      this.state.set(widgetId, widget);
      this.emit(WidgetStoreEvent.UPDATE_PROPS, { widgetId, properties });
    }
  }

  public getWidgets(): WidgetSchema[] {
    return Array.from(this.state.values());
  }

  public getWidget(widgetId: ID): WidgetSchema | undefined {
    return this.state.get(widgetId);
  }

  public getWidgetProperties<Properties extends Record<string, unknown> = Record<string, unknown>>(widgetId: ID) {
    const widget = this.getWidget(widgetId);
    return widget?.properties as Properties;
  }
}
