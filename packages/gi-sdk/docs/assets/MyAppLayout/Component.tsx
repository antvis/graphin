import { GraphContainer, type ImplementWidgetProps } from '@antv/gi-sdk';
import React from 'react';
import { PREFIX } from '../../constant';
import { Header, Panel, Sider } from './components';

type Slot = 'header' | 'sider' | 'panel' | 'canvas';

export interface MyAppLayoutProps extends ImplementWidgetProps<Slot> {
  showHeader: boolean;
}

export const MyAppLayout: React.FC<MyAppLayoutProps> = (props) => {
  const { slotElements, showHeader } = props;

  return (
    <div className={`${PREFIX}-container`}>
      {showHeader && <Header>{slotElements.header}</Header>}
      <div className={`${PREFIX}-content`}>
        <Sider>{slotElements.sider}</Sider>
        <div className={`${PREFIX}-graph-container`}>
          <GraphContainer>{slotElements.canvas}</GraphContainer>
        </div>
        <Panel>{slotElements.panel}</Panel>
      </div>
    </div>
  );
};
