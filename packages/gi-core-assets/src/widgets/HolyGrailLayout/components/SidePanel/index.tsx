import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useGlobalModel } from '@antv/gi-sdk';
import React, { PropsWithChildren, useMemo } from 'react';
import { WIDGET_PREFIX } from '../../constant';

export const SidePanel: React.FC<PropsWithChildren> = React.memo((props) => {
  const { children } = props;
  const [sider, updateSider] = useGlobalModel('sider');
  const toggleClass = useMemo(() => (!sider ? 'collapsed' : ''), [sider]);

  const toggleSidePanelCollapsed = () => {
    updateSider((prev) => !prev);
  };

  return (
    <div className={`${WIDGET_PREFIX}-side-panel`}>
      <div className={`${WIDGET_PREFIX}-side-panel-content ${toggleClass}`}>{children}</div>

      <div className={`${WIDGET_PREFIX}-side-panel-icon-container`}>
        <div className={`${WIDGET_PREFIX}-side-panel-icon`} onClick={toggleSidePanelCollapsed}>
          {sider ? <LeftOutlined /> : <RightOutlined />}
        </div>
      </div>
    </div>
  );
});
