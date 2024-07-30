import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { GraphContainer, useGlobalModel } from '@antv/gi-sdk';
import { Drawer } from 'antd';
import type { PropsWithChildren } from 'react';
import React from 'react';
import './Component.less';

type Slot = 'header' | 'sider' | 'panel' | 'canvas';

export interface MyAppLayoutProps extends ImplementWidgetProps<Slot> {
  showHeader: boolean;
}

const Header: React.FC<PropsWithChildren> = (props) => {
  return <div className="my-layout-header">{props.children}</div>;
};

const Sider: React.FC<PropsWithChildren> = (props) => {
  return <div className="my-layout-sider">{props.children}</div>;
};

const Panel: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [{ panel }, updateGlobalModel] = useGlobalModel();

  const onClose = () => {
    updateGlobalModel((prev) => ({ ...prev, panel: false }));
  };

  return (
    <div className="my-layout-panel">
      <Drawer placement="right" onClose={onClose} open={panel} getContainer={false}>
        {children}
      </Drawer>
    </div>
  );
};

export const MyAppLayout: React.FC<MyAppLayoutProps> = (props) => {
  const { slotElements, showHeader } = props;

  return (
    <div className="my-layout-container">
      {showHeader && <Header>{slotElements.header}</Header>}
      <div className="my-layout-content">
        <Sider>{slotElements.sider}</Sider>
        <div className="my-layout-graph-container">
          <GraphContainer>{slotElements.canvas}</GraphContainer>
        </div>
        <Panel>{slotElements.panel}</Panel>
      </div>
    </div>
  );
};
