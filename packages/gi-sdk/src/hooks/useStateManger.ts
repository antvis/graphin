import { useGIContext } from '../context';

export const useStateManger = () => {
  const { state } = useGIContext();

  return state;
};
