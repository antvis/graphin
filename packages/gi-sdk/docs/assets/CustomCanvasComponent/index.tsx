import type { ImplementWidget, ImplementWidgetProps } from '@antv/gi-sdk';
import { CustomCanvasComponent as CustomCanvasComponent2 } from './Component';

export const CustomCanvasComponent: ImplementWidget<ImplementWidgetProps> = {
  version: 'v0.1',
  metadata: {
    name: 'CustomCanvasComponent',
    displayName: '自定义图表组件',
    description: '这是一个自定义图表组件',
  },
  component: CustomCanvasComponent2,
};
