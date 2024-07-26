import type { GlobalModel } from '../context/types';
import type { Application } from '../spec';
import { DatasetStore } from './dataset';
import { GlobalStore } from './global';
import { GraphStore } from './graph';
import { WidgetStore } from './widget';

class StateManager {
  public globalStore: GlobalStore = new GlobalStore();

  public widgetStore: WidgetStore = new WidgetStore();

  public graphStore: GraphStore = new GraphStore();

  public datasetStore: DatasetStore = new DatasetStore();

  constructor(initialGlobalState: GlobalModel) {
    this.initGlobalStore(initialGlobalState);
  }

  private initGlobalStore(initialGlobalState: GlobalModel) {
    this.globalStore.setGlobal(initialGlobalState);
  }

  public initState(config: Application) {
    this.widgetStore.setWidgets(config.spec.widgets);
    this.graphStore.setGraphOptions(config.spec.graph);
    this.datasetStore.setDataset(config.dataset);
  }
}

export default StateManager;
