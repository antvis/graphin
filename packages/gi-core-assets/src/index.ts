import type { AssetPackage } from '@antv/gi-sdk';
import { HolyGrailLayout } from './widgets';

const GI_CORE_ASSETS: AssetPackage = {
  version: 'v0.1',
  metadata: {
    name: 'GI_CORE_ASSETS',
    displayName: 'GI 核心资产包',
  },
  widgets: [HolyGrailLayout],
  services: [],
};

export default GI_CORE_ASSETS;
