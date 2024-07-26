import React, { useMemo } from 'react';
import { ImplWidget } from '../components';
import type { WidgetSchema } from '../spec';
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

  return (
    <React.Fragment>
      {topLevelWidgets.map((widget) => (
        <ImplWidget key={widget.id} widget={widget} />
      ))}
    </React.Fragment>
  );
};
