import type { ImplementWidget } from '@antv/gi-sdk';
import type { HolyGrailLayoutProps } from './Component';
import { HolyGrailLayout as HolyGrailLayoutComponent } from './Component';

export const HolyGrailLayout: ImplementWidget<HolyGrailLayoutProps> = {
  version: '0.1',
  metadata: {
    name: 'HolyGrailLayout',
    displayName: '圣杯布局',
    description: '内置经典的布局方案，包含头部、右侧边栏、主体画布区域、左侧浮动面板和尾部五个区域。',
  },
  component: HolyGrailLayoutComponent,
  defaultProperties: {
    showHeader: true,
    showSidePanel: true,
    showFloatPanel: false,
    showFooter: false,
  },
};
