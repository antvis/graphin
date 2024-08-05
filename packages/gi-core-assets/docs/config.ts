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
      layout: { type: 'dagre' },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select', 'hover-activate'],
      animation: false,
      autoFit: 'view',
      padding: 100,
      node: {
        style: {
          labelText: (d) => d.id,
        },
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
        },
        slots: {
          header: ['title'],
          sidePanel: ['show-selected-content'],
          floatPanel: ['show-selected-content'],
          canvas: ['bind-click-node'],
          footer: ['copyright'],
        },
      },
      {
        id: 'language-switcher',
        type: 'LanguageSwitcher',
      },
      {
        id: 'title',
        type: 'AppTitle',
        slots: {
          navbar: ['language-switcher'],
        },
      },
      {
        id: 'copyright',
        type: 'Copyright',
      },
      {
        id: 'show-selected-content',
        type: 'ShowSelectedContent',
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
