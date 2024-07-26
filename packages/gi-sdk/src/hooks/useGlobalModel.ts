import { isFunction, isObject } from '@antv/util';
import { useCallback, useEffect, useState } from 'react';
import type { GlobalModel } from '../context/types';
import { GlobalStoreEvent } from '../state/constants';
import type { CallableValue } from '../types';
import { useStateManger } from './useStateManger';

export const useGlobalModel = () => {
  const { globalStore } = useStateManger();
  const [model, setModel] = useState<GlobalModel>(globalStore.getGlobal());

  useEffect(() => {
    const updateState = (model: GlobalModel) => {
      setModel(model);
    };

    globalStore.on(GlobalStoreEvent.UPDATE, updateState);
    return () => {
      globalStore.off(GlobalStoreEvent.UPDATE, updateState);
    };
  }, [globalStore]);

  const updatePartialModel = useCallback(
    (partialModel: Partial<GlobalModel>) => {
      const updatedModel = { ...model, ...partialModel };
      globalStore.setGlobal(updatedModel);
    },
    [model, globalStore],
  );

  const updateModel = useCallback(
    (newModel: CallableValue<GlobalModel>) => {
      const updatedModel = isFunction(newModel) ? newModel(model) : newModel;
      if (!isObject(updatedModel)) throw new Error('The new global model must be an object');
      globalStore.setGlobal(updatedModel);
    },
    [model, globalStore],
  );

  return [model, updatePartialModel, updateModel] as const;
};
