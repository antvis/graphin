import type { GraphOptions } from '@antv/g6';
import { isFunction } from '@antv/util';
import { useEffect, useState } from 'react';
import { GraphStoreEvent } from '../state/constants';
import type { CallableValue } from '../types';
import { useStateManager } from './useStateManager';

/**
 * Hook for graph options state management.
 * @returns [options, updateOptions]
 * @public
 */
export const useGraphOptions = () => {
  const { graphStore } = useStateManager();
  const [options, setOptions] = useState<GraphOptions>(graphStore.getGraphOptions());

  useEffect(() => {
    const updateInternalOptions = (options: GraphOptions) => {
      setOptions(options);
    };
    graphStore.on(GraphStoreEvent.UPDATE_OPTIONS, updateInternalOptions);
    return () => {
      graphStore.off(GraphStoreEvent.UPDATE_OPTIONS, updateInternalOptions);
    };
  }, [graphStore]);

  const updateOptions = (options: CallableValue<GraphOptions>) => {
    const newOptions = isFunction(options) ? options(graphStore.getGraphOptions()) : options;
    graphStore.setGraphOptions(newOptions);
  };

  return [options, updateOptions] as const;
};
