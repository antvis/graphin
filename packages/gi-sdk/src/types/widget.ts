import type { WidgetMetadata } from '../spec';
import type { ID } from './id';
import type { SlotElements } from './slot';

export interface ImplementWidget<Properties extends ImplementWidgetProps = ImplementWidgetProps> {
  /**
   * 组件版本号
   */
  version: string;
  /**
   * 组件元数据信息
   */
  metadata: WidgetMetadata;
  /**
   * 组件实现类
   */
  component: React.FC<Properties>;
  /**
   * 组件默认属性值
   */
  defaultProperties?: Partial<Properties>;
}

export interface ImplementWidgetProps<K extends string = string> {
  /**
   * 渲染组件 ID
   */
  'data-widget-id': ID;
  /**
   * 渲染组件名称
   */
  'data-widget-name': string;
  /**
   * 插槽子组件
   */
  slotElements: SlotElements<K>;
}
