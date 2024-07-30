import { isFunction, isObject } from '@antv/util';
import { useEffect, useRef, useState } from 'react';
import type { GlobalModel } from '../context/types';
import { GlobalStoreEvent } from '../state/constants';
import type { CallableValue } from '../types';
import { useStateManger } from './useStateManger';

/**
 * Hook for global model state management.
 * @param key - global model key
 * @returns [model, updateModel]
 * @public
 */
export const useGlobalModel = <T extends GlobalModel = GlobalModel, K extends keyof T = keyof T>(key?: K) => {
  const { globalStore } = useStateManger();
  const global = globalStore.getGlobal() as T;
  const initialModel = key ? global[key] : global;
  const [model, setModel] = useState<T | T[K]>(initialModel);
  const modelRef = useRef<T | T[K]>(model);

  useEffect(() => {
    const updateState = (updatedModel: T) => {
      const newModel = key ? updatedModel[key] : updatedModel;
      if (modelRef.current !== newModel) {
        setModel(newModel);
      }
    };

    globalStore.on(GlobalStoreEvent.UPDATE, updateState);
    return () => {
      globalStore.off(GlobalStoreEvent.UPDATE, updateState);
    };
  }, [globalStore, key]);

  useEffect(() => {
    modelRef.current = model;
  }, [model]);

  const updateModel = (newModel: CallableValue<T | T[K]>) => {
    const currentModel = modelRef.current!;
    const updatedModel = isFunction(newModel) ? newModel(currentModel) : newModel;
    const newGlobalModel = key ? { ...globalStore.getGlobal(), [key]: updatedModel } : updatedModel;

    if (!isObject(newGlobalModel)) throw new Error('The new global model must be an object');
    globalStore.setGlobal(newGlobalModel as GlobalModel);
  };

  return [model, updateModel] as const;
};
