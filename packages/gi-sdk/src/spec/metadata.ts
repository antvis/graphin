export interface Metadata {
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 其他属性
   */
  [key: string]: unknown;
}

export interface ApplicationMetadata extends Metadata {}

export interface WidgetMetadata extends Metadata {}

export interface ServiceMetadata extends Metadata {}
