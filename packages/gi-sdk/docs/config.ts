import type { Application } from '@antv/gi-sdk';

export const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  dataset: {
    id: '4a4fee6d-f4e8-403b-a1e6-19fc7fcad418',
    metadata: {
      name: '我链接的 GraphScope 数据',
    },
    type: 'remote',
    serviceType: 'GS_SERVICE_INTIAL_GRAPH',
    properties: {},
  },
  spec: {
    graph: {
      options: {
        theme: 'light',
      },
    },
    widgets: [
      {
        id: 'my-app-layout',
        type: 'MyAppLayout',
        properties: {
          showHeader: true,
        },
        slots: {
          header: ['custom-header'],
          sider: ['custom-sidebar'],
          panel: ['custom-panel'],
          canvas: ['custom-canvas-component'],
        },
      },
      {
        id: 'custom-header',
        type: 'CustomHeader',
      },
      {
        id: 'custom-sidebar',
        type: 'CustomSidebar',
        slots: ['statistic-card'],
      },
      {
        id: 'custom-panel',
        type: 'CustomPanel',
        properties: {
          count: 100,
        },
      },
      {
        id: 'custom-canvas-component',
        type: 'CustomCanvasComponent',
      },
      {
        id: 'statistic-card',
        type: 'StatisticCard',
      },
      // },
      // {
      //   id: 'copyright',
      //   type: 'Copyright',
      //   properties: {
      //     position: 'bottom-right',
      //   },
      // },
      // {
      //   id: 'toolbar',
      //   type: 'Toolbar',
      //   properties: {
      //     position: 'top-left',
      //   },
      //   slots: ['zoom-in', 'zoom-out'],
      // },
      // {
      //   id: 'zoom-in',
      //   type: 'ZoomIn',
      //   properties: {},
      // },
      // {
      //   id: 'zoom-out',
      //   type: 'ZoomOut',
      //   properties: {},
      // },
      // {
      //   id: 'property-panel',
      //   type: 'PropertyPanel',
      //   properties: {
      //     count: 100,
      //   },
      // },
    ],
  },
};
