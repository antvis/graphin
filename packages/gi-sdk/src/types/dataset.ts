import type { GraphData } from '@antv/g6';
import type { LocalDatasetSchema, RemoteDatasetSchema } from '../spec';

export type LocalDataset<D extends GraphData = GraphData> = LocalDatasetSchema<D>;

export type RemoteDataset<D extends GraphData = GraphData> = RemoteDatasetSchema & {
  /**
   * 图数据
   */
  data: D;
};

export type Dataset<D extends GraphData = GraphData> = LocalDataset<D> | RemoteDataset<D>;
