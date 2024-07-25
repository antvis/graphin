import type { GraphinContextProps, GraphinProps } from '@antv/graphin';
import type { WidgetItem } from './widget';

export interface GISDKProps {
  /**
   * The properties of the graph component.
   */
  graph: GraphinProps;
  /**
   * The widgets related to the graph.
   */
  widgets: WidgetItem[];
}

export interface GISDKContextProps extends GraphinContextProps {
  /*
   * The global model.
   */
  globalModel: GlobalModel;
  /**
   * The setter of the global model.
   */
  setGlobalModel: (value: Partial<GlobalModel> | ((prevState: Partial<GlobalModel>) => GlobalModel)) => void;
  /**
   * The peer widgets related to the graph.
   */
  widgets: WidgetItem[];
  /**
   * The setter of the widgets.
   */
  setWidgets: (value: WidgetItem[] | ((prevState: WidgetItem[]) => WidgetItem[])) => void;
}

export type GlobalModel = {
  /**
   * Whether the sider is open.
   */
  sider?: boolean;
  /**
   * Whether the panel is open.
   */
  panel?: boolean;
  /**
   * Other properties.
   */
  [key: string]: any;
};
