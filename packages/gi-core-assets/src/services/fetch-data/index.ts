import { ImplementService } from '@antv/gi-sdk';
import { getFetchData } from './service';

export const FetchData: ImplementService = {
  version: '0.1',
  metadata: {
    name: 'FetchData',
    displayName: '通过 fetch 获取数据',
  },
  service: getFetchData,
};
