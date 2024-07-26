import { useGIContext } from '../context';

export const useRegistryManger = () => {
  const { registry } = useGIContext();

  return registry;
};
