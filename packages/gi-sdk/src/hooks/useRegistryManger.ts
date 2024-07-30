import { useGIContext } from '../context';

/**
 * Hook to get the registry manager instance.
 * @returns registry manager instance
 * @public
 */
export const useRegistryManager = () => {
  const { registry } = useGIContext();

  return registry;
};
