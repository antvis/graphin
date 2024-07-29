import { useGIContext } from '../context';

export const useEventBus = () => {
  const { eventBus } = useGIContext();

  return eventBus;
};
