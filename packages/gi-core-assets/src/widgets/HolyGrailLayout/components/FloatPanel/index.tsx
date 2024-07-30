import { useGlobalModel } from '@antv/gi-sdk';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import React, { PropsWithChildren } from 'react';
import { WIDGET_PREFIX } from '../../constant';

export interface FloatPanelProps extends DrawerProps {}

export const FloatPanel: React.FC<PropsWithChildren<FloatPanelProps>> = React.memo((props) => {
  const { children, ...drawerProps } = props;
  const [panel, setPanel] = useGlobalModel('panel');

  const onClose = () => {
    setPanel(false);
  };

  return (
    <div className={`${WIDGET_PREFIX}-float-panel`}>
      <Drawer getContainer={false} placement="right" onClose={onClose} open={panel} {...drawerProps}>
        {children}
      </Drawer>
    </div>
  );
});
