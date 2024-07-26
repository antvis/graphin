import type { ImplementWidget } from '@antv/gi-sdk';
import type { CustomPanelProps } from './Component';
import { CustomPanel as CustomPanelComponent } from './Component';

export const CustomPanel: ImplementWidget<CustomPanelProps> = {
  version: 'v0.1',
  metadata: {
    name: 'CustomPanel',
    displayName: '自定义面板',
    description: '这是一个自定义面板',
  },
  component: CustomPanelComponent,
};
