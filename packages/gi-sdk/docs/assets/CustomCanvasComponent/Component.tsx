import { CanvasEvent, NodeEvent } from '@antv/g6';
import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { useGlobalModel, useGraph } from '@antv/gi-sdk';
import React, { useEffect } from 'react';

export const CustomCanvasComponent: React.FC<ImplementWidgetProps> = () => {
  const [, setGlobalModel] = useGlobalModel();
  const [graph] = useGraph();

  useEffect(() => {
    if (!graph || graph.destroyed) return;

    const clickNode = (e) => {
      const nodeId = e.target.id;
      setGlobalModel({ currentNode: graph?.getNodeData(nodeId), panel: true });
    };

    const clickCanvas = () => {
      setGlobalModel({ currentNode: null, panel: false });
    };

    graph.on(NodeEvent.CLICK, clickNode);
    graph.on(CanvasEvent.CLICK, clickCanvas);

    return () => {
      graph.off(NodeEvent.CLICK, clickNode);
      graph.off(CanvasEvent.CLICK, clickCanvas);
    };
  }, [graph]);

  return null;
};
