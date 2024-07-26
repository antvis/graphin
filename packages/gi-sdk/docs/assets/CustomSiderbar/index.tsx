import type { ImplementWidget, ImplementWidgetProps } from '@antv/gi-sdk';
import { CustomSidebar as CustomSidebarComponent } from './Component';

export const CustomSidebar: ImplementWidget<ImplementWidgetProps> = {
  version: 'v0.1',
  metadata: {
    name: 'CustomSidebar',
    displayName: '自定义右侧栏',
    description: '这是一个自定义右侧栏',
  },
  component: CustomSidebarComponent,
};
