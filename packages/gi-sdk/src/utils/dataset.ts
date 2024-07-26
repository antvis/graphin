import type { DatasetSchema, LocalDatasetSchema, RemoteDatasetSchema } from '../spec';

export const isLocalDataset = (dataset: DatasetSchema): dataset is LocalDatasetSchema => dataset.type === 'local';

export const isRemoteDataset = (dataset: DatasetSchema): dataset is RemoteDatasetSchema => dataset.type === 'remote';
