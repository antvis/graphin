<h1 align="center">GISDK</h1>

<div align="center">

SDK for Graph Insight App.

## ✨ 功能特性

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

## 📖 API Reference

## 🪝 Hooks

- `useGraph`
- `useGraphOptions`

- `useGlobalModel`
- `useEventSubscribe`
- `useEventPublish`
- `useWidgetProps`

### 画布相关 API

### 组件间通信

GISDK 3.0 提供 3 种通信方式：

- 状态
- 事件
- 修改数据外部传入属性

`useEventSubscribe`

`useEventPublish`

## `GraphContainer` 组件

## 🗂 Examples
