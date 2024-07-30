import type { DatasetSchema } from '../spec';
import type { Dataset } from '../types';
import { BaseState } from './base-state';
import { DatasetStoreEvent } from './constants';

type DatasetState = DatasetSchema;

export class DatasetStore extends BaseState<DatasetState> {
  protected state!: Dataset;

  public setDataset(dataset: Dataset) {
    this.state = dataset;
    this.emit(DatasetStoreEvent.UPDATE, dataset);
  }

  public getDataset() {
    return this.state;
  }
}
