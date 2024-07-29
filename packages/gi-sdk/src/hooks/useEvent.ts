import { useEffect } from 'react';
import { useEventBus } from './useEventBus';

export const useEventSubscribe = (evt: string, callback: (...args: any[]) => void, once?: boolean) => {
  const eventBus = useEventBus();

  useEffect(() => {
    eventBus.on(evt, callback, once);
    return () => {
      eventBus.off(evt, callback);
    };
  }, [eventBus, evt, callback, once]);
};

export const useEventPublish = () => {
  const eventBus = useEventBus();

  return eventBus.emit.bind(eventBus);
};
