import type { GraphOptions } from '@antv/g6';
import { Graph as G6Graph } from '@antv/g6';
import { BaseState } from './base-state';
import { GraphStoreEvent } from './constants';

type GraphState = {
  /**
   * 图实例
   */
  graph: G6Graph | null;
  /**
   * 图配置项
   */
  options: GraphOptions;
};

export class GraphStore extends BaseState<GraphState> {
  protected state: GraphState = {
    graph: null,
    options: {},
  };

  public getGraphInstance() {
    return this.state.graph;
  }

  public getGraphOptions() {
    return this.state.options;
  }

  public setGraphInstance(graph: G6Graph) {
    this.state.graph = graph;
    this.emit(GraphStoreEvent.UPDATE, graph);
  }

  public setGraphOptions(options: GraphOptions) {
    this.state.options = options;
    this.emit(GraphStoreEvent.UPDATE_OPTIONS, options);
  }
}
