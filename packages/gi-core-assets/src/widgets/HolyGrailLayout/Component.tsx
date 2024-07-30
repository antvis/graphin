/**
 * 圣杯布局资产
 */
import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { GraphContainer } from '@antv/gi-sdk';
import type { DrawerProps } from 'antd';
import React from 'react';
import './Component.less';
import { FloatPanel, Footer, Header, SidePanel } from './components';
import { WIDGET_PREFIX } from './constant';

type Slot = 'header' | 'sidePanel' | 'floatPanel' | 'canvas' | 'footer';

export interface HolyGrailLayoutProps extends ImplementWidgetProps<Slot> {
  /**
   * 是否显示头部
   */
  showHeader?: boolean;
  /**
   * 是否显示侧边栏
   */
  showSidePanel?: boolean;
  /**
   * 是否显示浮动面板
   */
  showFloatPanel?: boolean;
  /**
   * 浮动面板属性
   */
  floatPanel?: DrawerProps;
  /**
   * 是否显示尾部
   */
  showFooter?: boolean;
}

export const HolyGrailLayout: React.FC<HolyGrailLayoutProps> = React.memo((props) => {
  const { slotElements, showHeader, showFooter, showFloatPanel, showSidePanel, floatPanel } = props;

  return (
    <div className={`${WIDGET_PREFIX}-container`}>
      {showHeader && <Header>{slotElements.header}</Header>}
      <div className={`${WIDGET_PREFIX}-content`}>
        {showSidePanel && <SidePanel>{slotElements.sidePanel}</SidePanel>}
        <GraphContainer className={`${WIDGET_PREFIX}-graph-container`} style={{ width: '100%' }}>
          {slotElements.canvas}
          {showFloatPanel && <FloatPanel {...floatPanel}>{slotElements.floatPanel}</FloatPanel>}
        </GraphContainer>
      </div>
      {showFooter && <Footer>{slotElements.footer}</Footer>}
    </div>
  );
});
