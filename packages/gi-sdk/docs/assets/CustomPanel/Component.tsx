import { ImplementWidgetProps } from '@antv/gi-sdk';
import React from 'react';
import { fontStyle } from '../../constant';

export interface CustomPanelProps extends ImplementWidgetProps {
  count: number;
}

export const CustomPanel: React.FC<CustomPanelProps> = (props) => {
  const { count } = props;
  // const [globalModel] = useGlobalModel();
  // const isSiderOpen = globalModel?.sider;

  const isSiderOpen = true;

  return (
    <div>
      <p style={fontStyle}>{count}...</p>
      <p>Sider {isSiderOpen ? <b style={fontStyle}>opened</b> : <b style={fontStyle}>closed</b>}</p>
      <p>{/* current node: <b style={fontStyle}>{globalModel.currentNode?.id}</b> */}</p>
    </div>
  );
};
