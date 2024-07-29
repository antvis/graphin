import type EventEmitter from '@antv/event-emitter';
import type RegistryManager from '../registry';
import type StateManager from '../state';

export interface RuntimeContext {
  /**
   * 注册管理器
   */
  registry?: RegistryManager;
  /**
   * 全局状态管理器
   */
  state?: StateManager;
  /**
   * 事件管理器
   */
  eventBus?: EventEmitter;
}
