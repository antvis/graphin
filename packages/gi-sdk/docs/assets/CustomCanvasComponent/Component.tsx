import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { useGlobalModel, useGraph } from '@antv/gi-sdk';
import React from 'react';

export const CustomCanvasComponent: React.FC<ImplementWidgetProps> = () => {
  // const [, updateGlobalModel] = useGlobalModel();
  // const graph = useGraph();
  const [, setGlobalModel] = useGlobalModel();
  const [graph] = useGraph();
  console.log('graph', graph);

  // useEventSubscribe<IPointerEvent<Node>>(NodeEvent.CLICK, (e) => {
  //   const nodeId = e.target.id;
  //   updateGlobalModel({ currentNode: graph?.getNodeData(nodeId), panel: true });
  // });

  // useEventSubscribe(CanvasEvent.CLICK, (e) => {
  //   updateGlobalModel({ currentNode: null, panel: false });
  // });

  return null;
};
