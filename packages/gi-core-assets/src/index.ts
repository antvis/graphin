import type { AssetPackage } from '@antv/gi-sdk';
import $i18n from './i18n';
import strings from './i18n/strings';
import { FetchData } from './services';
import { HolyGrailLayout } from './widgets';

$i18n.loadResources(strings);

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
export { $i18n };
