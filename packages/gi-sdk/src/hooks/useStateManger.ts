import { useGIContext } from '../context';

/**
 * Hook to get the state manager instance.
 * @returns state manager instance
 * @internal
 */
export const useStateManger = () => {
  const { state } = useGIContext();

  return state;
};
