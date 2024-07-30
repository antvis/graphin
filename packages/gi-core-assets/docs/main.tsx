import GICoreAssets from '@antv/gi-core-assets';
import { GISDK } from '@antv/gi-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import { myAssetPackage } from './asset';
import { config } from './config';

export const Demo: React.FC = () => {
  const assets = [GICoreAssets, myAssetPackage];

  return (
    <GISDK
      className="my-graph-application"
      config={config}
      assets={assets}
      initialGlobalState={{ panel: false, sider: true, currentNode: null }}
    />
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
