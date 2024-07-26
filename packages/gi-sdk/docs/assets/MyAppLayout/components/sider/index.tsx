import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useGlobalModel } from '@antv/gi-sdk';
import React, { PropsWithChildren } from 'react';
import { CSSTransition } from 'react-transition-group';
import { PREFIX } from '../../../../constant';
import './index.less';

export const Sider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [{ sider }, updateGlobalModel] = useGlobalModel();

  return (
    <React.Fragment>
      <div className={`${PREFIX}-sider`}>
        <div className={`${PREFIX}-tool`}>
          <div
            className={`${PREFIX}-sider-icon`}
            onClick={() => {
              updateGlobalModel({ sider: !sider });
            }}
          >
            {sider ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </div>
        </div>
        <CSSTransition in={sider} classNames="fade" timeout={400}>
          <div className={`${PREFIX}-sider-content`}>{children}</div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};
