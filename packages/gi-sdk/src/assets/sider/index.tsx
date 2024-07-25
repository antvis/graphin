import React, { PropsWithChildren } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { PREFIX } from '../../constants';
import { useGlobalModel } from '../../context';
import './index.less';

export const Sider: React.FC<PropsWithChildren> = props => {
  const { children } = props;
  const [globalModel, updateGlobalModel] = useGlobalModel();
  const isSiderOpen = Boolean(globalModel.sider);

  return (
    <React.Fragment>
      <div className={`${PREFIX}-sider`}>
        <div className={`${PREFIX}-tool`}>
          <div
            className={`${PREFIX}-sider-icon`}
            onClick={() => {
              updateGlobalModel({ sider: !globalModel.sider });
            }}
          >
            {isSiderOpen ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </div>
        </div>
        <CSSTransition in={isSiderOpen} classNames="fade" timeout={400}>
          <div className={`${PREFIX}-sider-content`}>{children}</div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};
