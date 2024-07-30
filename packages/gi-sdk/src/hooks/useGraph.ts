import type { Graph as G6Graph } from '@antv/g6';
import { useEffect, useState } from 'react';
import { GraphStoreEvent } from '../state/constants';
import { useStateManager } from './useStateManager';

/**
 * Hook for graph instance management.
 * @returns [graph, updateGraph]
 * @public
 */
export const useGraph = () => {
  const { graphStore } = useStateManager();
  const [graph, setGraph] = useState<G6Graph | null>(graphStore.getGraphInstance());

  useEffect(() => {
    const updateInternalGraph = (graph: G6Graph) => {
      setGraph(graph);
    };
    graphStore.on(GraphStoreEvent.UPDATE, updateInternalGraph);
    return () => {
      graphStore.off(GraphStoreEvent.UPDATE, updateInternalGraph);
    };
  }, [graphStore]);

  const updateGraph = (graph: G6Graph) => {
    graphStore.setGraphInstance(graph);
  };

  return [graph, updateGraph] as const;
};
