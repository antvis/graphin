import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { Button } from 'antd';
import React from 'react';
import { fontStyle } from '../../constant';

export const CustomSidebar: React.FC<ImplementWidgetProps> = (props) => {
  const { slotElements } = props;
  // const [globalModel] = useGlobalModel();
  // const [, updateWidget] = useWidgets();
  // const isPanelOpen = globalModel?.panel;
  const isPanelOpen = true;

  return (
    <div>
      <p>Sider</p>
      <p>Panel {isPanelOpen ? <b style={fontStyle}>opened</b> : <b style={fontStyle}>closed</b>}</p>
      <Button
        onClick={() => {
          // updateWidget({ name: 'custom-panel', properties: { count: Math.floor(Math.random() * 1000) } });
        }}
      >
        Change panel Count
      </Button>
      <b style={fontStyle}>{slotElements.default}</b>
    </div>
  );
};
