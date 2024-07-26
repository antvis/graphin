import { Drawer } from 'antd';
import React, { PropsWithChildren, useState } from 'react';
import { PREFIX } from '../../../../constant';

export const Panel: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${PREFIX}-panel`}>
      <Drawer placement="right" onClose={onClose} open={open} getContainer={false}>
        {children}
      </Drawer>
    </div>
  );
};
