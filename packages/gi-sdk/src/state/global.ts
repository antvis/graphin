import type { GlobalModel } from '../context/types';
import { BaseState } from './base-state';
import { GlobalStoreEvent } from './constants';

export class GlobalStore extends BaseState<GlobalModel> {
  protected state: GlobalModel = {};

  constructor(initialState?: GlobalModel) {
    super();
    if (initialState) this.state = initialState;
  }

  public setGlobal(global: GlobalModel): void {
    this.state = global;
    this.emit(GlobalStoreEvent.UPDATE, this.state);
  }

  public getGlobal() {
    return this.state;
  }
}
