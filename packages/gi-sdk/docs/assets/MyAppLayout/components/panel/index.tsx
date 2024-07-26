import { useGlobalModel } from '@antv/gi-sdk';
import { Drawer } from 'antd';
import React, { PropsWithChildren } from 'react';
import { PREFIX } from '../../../../constant';

export const Panel: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [{ panel }, updateGlobalModel] = useGlobalModel();

  const onClose = () => {
    updateGlobalModel({ panel: false });
  };

  return (
    <div className={`${PREFIX}-panel`}>
      <Drawer placement="right" onClose={onClose} open={panel} getContainer={false}>
        {children}
      </Drawer>
    </div>
  );
};
