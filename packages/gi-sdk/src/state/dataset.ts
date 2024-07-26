import type { DatasetSchema } from '../spec';
import { BaseState } from './base-state';
import { DatasetStoreEvent } from './constants';

type DatasetState = DatasetSchema;

export class DatasetStore extends BaseState<DatasetState> {
  protected state!: DatasetSchema;

  public setDataset(dataset: DatasetSchema) {
    this.state = dataset;
    this.emit(DatasetStoreEvent.UPDATE, dataset);
  }

  public getDataset() {
    return this.state;
  }
}
