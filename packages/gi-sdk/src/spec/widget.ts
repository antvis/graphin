import type { ID, Slot } from '../types';
import type { WidgetMetadata } from './metadata';

export interface WidgetSchema {
  /**
   * 组件 ID
   */
  id: ID;
  /**
   * 组件资产类型，组件资产名
   * @description
   * 【协议规范】对应 ImplementWidget.metadata.name
   */
  type: string;
  /**
   * 元数据信息，用于存储组件元数据信息
   */
  metadata?: WidgetMetadata;
  /*
   * 组件属性
   */
  properties?: Record<string, unknown>;
  /**
   * 插槽子组件
   * @description
   * - 只有子组件时: string[]，子组件的 ID
   * - 有多个插槽子组件: Record<string, string[]>，插槽名: 子组件的 ID，{default: [], left: []}
   */
  slots?: Slot;
}
