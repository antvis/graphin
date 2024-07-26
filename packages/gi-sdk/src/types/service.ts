import type { ServiceMetadata } from '../spec';

export interface ImplementService {
  /**
   * 服务资产版本号
   */
  version: string;
  /**
   * 服务元数据信息
   */
  metadata: ServiceMetadata;
  /**
   * 服务具体调用实现
   */
  service: (...params: any[]) => Promise<unknown>;
}
