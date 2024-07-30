import type { AssetPackage } from '@antv/gi-sdk';
import { FetchData } from './services';
import { HolyGrailLayout } from './widgets';

const GI_CORE_ASSETS: AssetPackage = {
  version: '0.1',
  metadata: {
    name: 'GI_CORE_ASSETS',
    displayName: 'GI 核心资产包',
  },
  widgets: [HolyGrailLayout],
  services: [FetchData],
};

export default GI_CORE_ASSETS;
