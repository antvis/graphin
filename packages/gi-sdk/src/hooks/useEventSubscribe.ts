import type { IEvent } from '@antv/g6';
import { useEffect } from 'react';
import { useGraph } from '../context';

/**
 * Subscribe to an event
 * @param eventName - event name
 * @param callback - callback for the event
 * @param once - whether to listen only once
 */
export const useEventSubscribe = <T extends IEvent = IEvent>(
  eventName: string,
  callback: (event: T) => void,
  once?: boolean,
) => {
  const graph = useGraph();

  useEffect(() => {
    if (!graph || graph.destroyed) return;

    graph.on(eventName, callback, once);

    return () => {
      graph.off(eventName, callback);
    };
  }, [graph]);
};
