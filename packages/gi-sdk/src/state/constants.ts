/**
 * 全局扩展状态事件
 */
export enum GlobalStoreEvent {
  'UPDATE' = 'global:update',
}

/**
 * 组件状态管理事件
 */
export enum WidgetStoreEvent {
  'UPDATE_PROPS' = 'widget:update-properties',
}

/**
 * 图状态管理事件
 */
export enum GraphStoreEvent {
  'UPDATE' = 'graph:update',
  'UPDATE_OPTIONS' = 'graph:update-options',
}

export enum DatasetStoreEvent {
  'UPDATE' = 'dataset:update',
}
