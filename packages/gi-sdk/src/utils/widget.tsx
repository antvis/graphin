import React, { useCallback, useMemo } from 'react';
import { useRegistryManger, useWidgetProps } from '../hooks';
import type { WidgetSchema } from '../spec';
import type { SlotElements } from '../types';
import { parseSlot } from './slot';

/**
 * 提取组件的所有插槽 ID
 * @param widget - 组件配置
 * @returns 插槽 ID 列表
 */
export function extractSlotIds(widget: WidgetSchema) {
  return Object.values(parseSlot(widget.slots)).flat();
}

/**
 * 获取顶层组件（没有被其他组件作为插槽使用）
 * @param widgets - 组件配置列表
 * @returns 顶层组件列表
 */
export function getTopLevelWidgets(widgets: WidgetSchema[]): WidgetSchema[] {
  const childWidgetIds = new Set<string>();

  widgets.forEach((widget) => {
    const slotIds = extractSlotIds(widget);
    slotIds.forEach((childId) => childWidgetIds.add(childId));
  });

  return widgets.filter((widget) => !childWidgetIds.has(widget.id));
}

/**
 * 根据组件配置递归渲染组件以及插槽
 * @param widgets - 组件配置列表
 * @returns 组件树
 */
export const useImplementWidgets = (widgets: WidgetSchema[]): React.ReactNode => {
  const topLevelWidgets = useMemo(() => getTopLevelWidgets(widgets), [widgets]);
  const registryManager = useRegistryManger();

  const renderWidget = useCallback(
    (widget: WidgetSchema) => {
      const { id: widgetId, type, slots } = widget;
      const widgetOption = registryManager.getWidget(type);
      const [properties] = useWidgetProps(widgetId);
      const mergedProperties = Object.assign({}, widgetOption.defaultProperties, properties);
      const ImplWidget = widgetOption.component;

      let slotElements: SlotElements = {};

      if (slots) {
        const parsedSlots = parseSlot(slots);
        slotElements = Object.entries(parsedSlots).reduce((acc, [slotName, slotIds]) => {
          const slotWidgets = slotIds.map((id) => widgets.find((w) => w.id === id)).filter(Boolean) as WidgetSchema[];

          if (!slotWidgets.length) return acc;

          acc[slotName] = slotWidgets.map(renderWidget);
          return acc;
        }, {});
      }

      return (
        <React.Fragment key={widgetId}>
          <ImplWidget
            data-widget-id={widgetId}
            data-widget-name={widgetOption.metadata.name}
            slotElements={slotElements}
            {...mergedProperties}
          />
        </React.Fragment>
      );
    },
    [registryManager, widgets],
  );

  return <React.Fragment>{topLevelWidgets.map(renderWidget)}</React.Fragment>;
};
