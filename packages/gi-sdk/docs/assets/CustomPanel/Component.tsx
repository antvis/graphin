import { ImplementWidgetProps, useGlobalModel } from '@antv/gi-sdk';
import React from 'react';
import { fontStyle } from '../../constant';

export interface CustomPanelProps extends ImplementWidgetProps {
  count: number;
}

export const CustomPanel: React.FC<CustomPanelProps> = (props) => {
  const { count } = props;
  const [{ currentNode }] = useGlobalModel();

  const isSiderOpen = true;

  return (
    <div>
      <p style={fontStyle}>{count}...</p>
      <p>Sider {isSiderOpen ? <b style={fontStyle}>opened</b> : <b style={fontStyle}>closed</b>}</p>
      <p>
        current node: <b style={fontStyle}>{currentNode?.id}</b>
      </p>
    </div>
  );
};
