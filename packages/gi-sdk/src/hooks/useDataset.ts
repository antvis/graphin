import type { GraphData } from '@antv/g6';
import { isFunction } from '@antv/util';
import type { DefaultError } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import type { DatasetSchema } from '../spec';
import { DatasetStoreEvent } from '../state/constants';
import type { CallableValue } from '../types';
import type { Dataset } from '../types/dataset';
import { isRemoteDataset } from '../utils/dataset';
import { queryClient } from '../utils/service';
import { useRegistryManger } from './useRegistryManger';
import { useStateManger } from './useStateManger';

/**
 * 处理 remote dataset schema 并获取数据，写到 dataset 中
 * @param dataset dataset schema
 */
const inferRemoteDataset = (dataset: DatasetSchema) => {
  const { datasetStore } = useStateManger();
  const registryManager = useRegistryManger();

  if (!isRemoteDataset(dataset)) return;

  const implServiceConfig = registryManager.getService(dataset.serviceType);

  const { data } = useQuery<unknown, DefaultError, GraphData>(
    {
      queryKey: [implServiceConfig.metadata.name, dataset.properties],
      queryFn: () => implServiceConfig.service({ properties: dataset.properties }),
      placeholderData: {},
    },
    queryClient,
  );

  const newDataset = { ...dataset, data: data! };
  const oldDataset = datasetStore.getDataset();
  if (oldDataset.data !== newDataset.data) datasetStore.setDataset(newDataset);
};

/**
 * Hook for dataset management.
 * @returns [dataset, updateDataset]
 * @internal
 */
export const useDataset = () => {
  const { datasetStore } = useStateManger();
  const [dataset, setDataset] = useState<Dataset>(datasetStore.getDataset());

  inferRemoteDataset(dataset);

  useEffect(() => {
    const updateInternalDataset = (dataset: Dataset) => {
      setDataset(dataset);
    };
    datasetStore.on(DatasetStoreEvent.UPDATE, updateInternalDataset);
    return () => {
      datasetStore.off(DatasetStoreEvent.UPDATE, updateInternalDataset);
    };
  }, [datasetStore]);

  const updateDataset = useCallback(
    (dataset: CallableValue<Dataset>) => {
      const newDataset = isFunction(dataset) ? dataset(datasetStore.getDataset()) : dataset;
      datasetStore.setDataset(newDataset);
    },
    [datasetStore],
  );

  return [dataset, updateDataset] as const;
};
