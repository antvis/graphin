import type { Application } from '@antv/gi-sdk';

export const config: Application = {
  version: '0.1',
  metadata: {
    name: '测试应用',
  },
  dataset: {
    id: '4a4fee6d-f4e8-403b-a1e6-19fc7fcad418',
    metadata: {
      name: '远程测试数据',
    },
    type: 'remote',
    serviceType: 'FetchData',
    properties: {
      url: 'https://assets.antv.antgroup.com/g6/cluster.json',
    },
  },
  spec: {
    graph: {
      autoResize: true,
      layout: { type: 'force' },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select', 'hover-activate'],
      animation: false,
      autoFit: 'view',
      node: {
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
    },
    widgets: [
      {
        id: 'layout',
        type: 'HolyGrailLayout',
        properties: {
          showHeader: true,
          showFooter: true,
          showFloatPanel: true,
          floatPanel: {
            afterOpenChange: (open) => {
              alert('afterOpenChange');
            },
          },
        },
        slots: {
          header: ['title'],
          sidePanel: ['global-state-tester', 'event-bus-tester', 'graph-option-tester'],
          floatPanel: ['float-panel-content'],
          canvas: ['bind-click-node'],
          footer: ['copyright'],
        },
      },
      {
        id: 'title',
        type: 'AppTitle',
      },
      {
        id: 'copyright',
        type: 'Copyright',
      },
      {
        id: 'event-bus-tester',
        type: 'EventBusTester',
      },
      {
        id: 'global-state-tester',
        type: 'GlobalStateTester',
      },
      {
        id: 'graph-option-tester',
        type: 'GraphOptionTester',
      },
      {
        id: 'float-panel-content',
        type: 'FloatPanelContent',
        properties: {
          count: 100,
        },
      },
      {
        id: 'bind-click-node',
        type: 'ClickNodeWidget',
      },
    ],
  },
};
