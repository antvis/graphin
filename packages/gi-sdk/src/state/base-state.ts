import EventEmitter from '@antv/event-emitter';

export abstract class BaseState<S> extends EventEmitter {
  protected abstract state: S;
}
