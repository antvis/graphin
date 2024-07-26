import { isFunction } from '@antv/util';
import { useCallback, useEffect, useState } from 'react';
import type { DatasetSchema } from '../spec';
import { CallableValue } from '../types';
import { useStateManger } from './useStateManger';

export const useDataset = () => {
  const { datasetStore } = useStateManger();
  const [dataset, setDataset] = useState<DatasetSchema>(datasetStore.getDataset());

  useEffect(() => {
    const updateInternalDataset = (dataset: DatasetSchema) => {
      setDataset(dataset);
    };
    datasetStore.on('dataset:update', updateInternalDataset);
    return () => {
      datasetStore.off('dataset:update', updateInternalDataset);
    };
  }, [datasetStore]);

  const updateDataset = useCallback(
    (dataset: CallableValue<DatasetSchema>) => {
      const newDataset = isFunction(dataset) ? dataset(datasetStore.getDataset()) : dataset;
      datasetStore.setDataset(newDataset);
    },
    [datasetStore],
  );

  return [dataset, updateDataset] as const;
};
