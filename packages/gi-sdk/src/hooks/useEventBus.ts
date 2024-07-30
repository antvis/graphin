import { useGIContext } from '../context';

/**
 * Hook to get the event bus instance.
 * @returns event bus instance
 * @internal
 */
export const useEventBus = () => {
  const { eventBus } = useGIContext();

  return eventBus;
};
