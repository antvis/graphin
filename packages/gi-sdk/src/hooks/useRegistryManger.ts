import { useGIContext } from '../context';

/**
 * Hook to get the registry manager instance.
 * @returns registry manager instance
 * @public
 */
export const useRegistryManger = () => {
  const { registry } = useGIContext();

  return registry;
};
