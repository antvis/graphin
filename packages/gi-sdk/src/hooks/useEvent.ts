import { useEffect } from 'react';
import { useEventBus } from './useEventBus';

/**
 * Hook for subscribing to events.
 * @param evt - event name
 * @param callback - callback function
 * @param once - whether to subscribe only once
 * @public
 */
export const useEventSubscribe = (evt: string, callback: (...args: any[]) => void, once?: boolean) => {
  const eventBus = useEventBus();

  useEffect(() => {
    eventBus.on(evt, callback, once);
    return () => {
      eventBus.off(evt, callback);
    };
  }, [eventBus, evt, callback, once]);
};

/**
 * Hook for publishing events.
 * @returns event publish function
 * @public
 */
export const useEventPublish = () => {
  const eventBus = useEventBus();

  return eventBus.emit.bind(eventBus);
};
