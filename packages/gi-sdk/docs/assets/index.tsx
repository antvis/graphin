import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { AssetPackage, ImplementWidget } from '@antv/gi-sdk';
import React from 'react';
import { CustomCanvasComponent } from './CustomCanvasComponent';
import { CustomPanel } from './CustomPanel';
import { CustomSidebar } from './CustomSiderbar';
import { MyAppLayout } from './MyAppLayout';

export const CustomHeader: ImplementWidget<ImplementWidgetProps> = {
  version: 'v0.1',
  metadata: {
    name: 'CustomHeader',
    displayName: '自定义头部',
    description: '这是一个自定义头部',
  },
  component: () => {
    return <h1 style={{ height: 48, lineHeight: '48px', textAlign: 'center' }}>GI-SDK</h1>;
  },
};

export const StatisticCard: ImplementWidget = {
  version: 'v0.1',
  metadata: {
    name: 'StatisticCard',
    displayName: '统计卡片',
    description: '用于展示统计数据的卡片',
  },
  component: () => {
    return <div>StatisticCard</div>;
  },
};

export const myAssetPackage: AssetPackage = {
  version: 'v0.1',
  widgets: [
    MyAppLayout,
    CustomCanvasComponent,
    CustomHeader,
    CustomPanel,
    CustomSidebar,
    StatisticCard,
  ] as ImplementWidget<ImplementWidgetProps>[],
};
