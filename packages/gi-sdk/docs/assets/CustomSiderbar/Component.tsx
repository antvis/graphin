import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { useGlobalModel, useGraphOptions, useWidgetProps } from '@antv/gi-sdk';
import { Button } from 'antd';
import React from 'react';
import { fontStyle } from '../../constant';

export const CustomSidebar: React.FC<ImplementWidgetProps> = (props) => {
  const { slotElements } = props;
  const [{ panel }, setGlobalModel] = useGlobalModel();
  const [, updatePanelProperties] = useWidgetProps('custom-panel');
  const [, updateOptions] = useGraphOptions();

  const openPanel = () => {
    setGlobalModel({ panel: true });
  };

  return (
    <div>
      <p>Sider</p>
      <p>
        Panel <b style={fontStyle}>{panel ? 'opened' : 'closed'}</b>
      </p>
      <Button onClick={openPanel}>Open Panel</Button>
      <Button
        onClick={() => {
          updatePanelProperties({ count: Math.floor(Math.random() * 1000) });
        }}
      >
        Change panel Count
      </Button>
      <b style={fontStyle}>{slotElements.default}</b>
      <Button
        onClick={() => {
          updateOptions((options) => ({ ...options, layout: { type: 'dagre' } }));
        }}
      >
        Change Layout
      </Button>
    </div>
  );
};
