import type { GlobalModel } from '../context/types';
import type { Application } from '../spec';
import { GlobalStore } from './global';
import { WidgetStore } from './widget';

class StateManager {
  public globalStore: GlobalStore = new GlobalStore();

  public widgetStore: WidgetStore = new WidgetStore();

  constructor(initialGlobalState: GlobalModel) {
    this.initGlobalStore(initialGlobalState);
  }

  private initGlobalStore(initialGlobalState: GlobalModel) {
    this.globalStore.setGlobal(initialGlobalState);
  }

  public initState(config: Application) {
    this.widgetStore.setWidgets(config.spec.widgets);
  }
}

export default StateManager;
