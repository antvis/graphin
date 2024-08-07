import { useGIContext } from '../context';

/**
 * Hook to get the state manager instance.
 * @returns state manager instance
 * @internal
 */
export const useStateManager = () => {
  const { state } = useGIContext();

  return state;
};
