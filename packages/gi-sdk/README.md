<h1 align="center">GISDK</h1>

<div align="center">

SDK for Graph Insight App.

## 🔨 快速使用

```jsx | pure
import React from 'react';
import { GISDK } from '@antv/gi-sdk';
import { myAssetPackage } from './assets';
import { config } from './config';

export default () => {
  const assets = [myAssetPackage];

  return <GISDK className="my-graph-application" style={{ height: '80vh' }} config={config} assets={assets}></GISDK>;
};
```
