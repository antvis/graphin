import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import React, { PropsWithChildren, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { PREFIX } from '../../../../constant';
import './index.less';

export const Sider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div className={`${PREFIX}-sider`}>
        <div className={`${PREFIX}-tool`}>
          <div
            className={`${PREFIX}-sider-icon`}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            {open ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </div>
        </div>
        <CSSTransition in={open} classNames="fade" timeout={400}>
          <div className={`${PREFIX}-sider-content`}>{children}</div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};
