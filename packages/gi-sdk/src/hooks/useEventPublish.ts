import { useEffect } from 'react';
import { useGraph } from '../context';
import type { IEvent } from '@antv/g6';

/**
 * Emit an event
 * @param eventName - event name
 * @param event - event object
 */
export const useEventPublish = <T extends IEvent = IEvent>(eventName: string, event: T) => {
  const graph = useGraph();

  useEffect(() => {
    if (!graph || graph.destroyed) return;

    graph.emit(eventName, event);
  }, [graph]);
};
