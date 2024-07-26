import type { Metadata } from '../spec';
import type { ImplementService } from './service';
import type { ImplementWidget } from './widget';

/**
 * 资产包
 */
export interface AssetPackage {
  /**
   * 资产包版本号
   */
  version: string;
  /**
   * 资产包元数据信息
   */
  metadata?: Metadata;
  /**
   * 组件资产列表
   */
  widgets: ImplementWidget[];
  /**
   * 服务资产列表
   */
  services?: ImplementService[];
}
