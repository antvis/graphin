import React, { PropsWithChildren } from 'react';
import { Drawer } from 'antd';
import { PREFIX } from '../../constants';
import { useGlobalModel } from '../../context';

export const Panel: React.FC<PropsWithChildren> = props => {
  const { children } = props;
  const [globalModel, updateGlobalModel] = useGlobalModel();
  const isPanelOpen = Boolean(globalModel.panel);

  const onClose = () => {
    updateGlobalModel({ panel: false });
  };

  return (
    <div className={`${PREFIX}-panel`}>
      <Drawer placement="right" onClose={onClose} open={isPanelOpen} getContainer={false}>
        {children}
      </Drawer>
    </div>
  );
};
