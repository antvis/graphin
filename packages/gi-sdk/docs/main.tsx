import { GISDK } from '@antv/gi-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import { myAssetPackage } from './assets';
import { config } from './config';
import './index.less';

export const Demo: React.FC = () => {
  const assets = [myAssetPackage];

  return (
    <GISDK
      className="my-graph-application"
      style={{ backgroundColor: '#bdd8e1' }}
      config={config}
      assets={assets}
      initialGlobalState={{ panel: false, sider: true }}
    ></GISDK>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
