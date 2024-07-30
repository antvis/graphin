import { useGlobalModel } from '@antv/gi-sdk';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import React, { PropsWithChildren } from 'react';
import { WIDGET_PREFIX } from '../../constant';

export const FloatPanel: React.FC<PropsWithChildren<DrawerProps>> = React.memo((props) => {
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
