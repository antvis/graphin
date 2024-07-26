import type { ImplementWidget } from '@antv/gi-sdk';
import type { MyAppLayoutProps } from './Component';
import { MyAppLayout as MyAppLayoutComponent } from './Component';

export const MyAppLayout: ImplementWidget<MyAppLayoutProps> = {
  version: 'v0.1',
  metadata: {
    name: 'MyAppLayout',
    displayName: '我的布局组件',
    description: '这是一个布局组件',
  },
  component: MyAppLayoutComponent,
  defaultProperties: {
    showHeader: true,
  },
};
