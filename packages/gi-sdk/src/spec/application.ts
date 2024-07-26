import type { DatasetSchema } from './dataset';
import type { GraphSchema } from './graph';
import type { ApplicationMetadata } from './metadata';
import type { WidgetSchema } from './widget';

export interface Application {
  /**
   * 应用版本号
   */
  version: string;
  /**
   * 应用元数据
   */
  metadata: ApplicationMetadata;
  /**
   * 数据集
   */
  dataset: DatasetSchema;
  /**
   * 应用配置
   */
  spec: {
    /**
     * 图配置
     */
    graph: GraphSchema;
    /**
     * 组件
     */
    widgets: WidgetSchema[];
  };
}
