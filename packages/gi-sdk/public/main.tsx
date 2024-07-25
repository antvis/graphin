import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { GISDK, registerWidget, useEventSubscribe, useGlobalModel, useGraph, useWidgets } from '@antv/gi-sdk';
import type { WidgetItem } from '@antv/gi-sdk';
import type { GraphinProps } from '@antv/graphin';
import { Button, Spin } from 'antd';
import { CanvasEvent, NodeEvent } from '@antv/g6';
import type { IPointerEvent, Node } from '@antv/g6';

const style = {
  fontSize: 32,
  color: 'green',
};

const CustomSidebar: React.FC = () => {
  const [globalModel] = useGlobalModel();
  const [, updateWidget] = useWidgets();
  const isPanelOpen = globalModel?.panel;

  return (
    <div style={{ height: '100%' }}>
      <p>Sider</p>
      <p>Panel {isPanelOpen ? <b style={style}>opened</b> : <b style={style}>closed</b>}</p>
      <Button
        onClick={() => {
          updateWidget({ name: 'custom-panel', properties: { count: Math.floor(Math.random() * 1000) } });
        }}
      >
        Change panel Count
      </Button>
    </div>
  );
};

const CustomPanel: React.FC<{ count: number }> = props => {
  const { count } = props;
  const [globalModel] = useGlobalModel();
  const isSiderOpen = globalModel?.sider;

  return (
    <div>
      <p style={style}>{count}...</p>
      <p>Sider {isSiderOpen ? <b style={style}>opened</b> : <b style={style}>closed</b>}</p>
      <p>
        current node: <b style={style}>{globalModel.currentNode?.id}</b>
      </p>
    </div>
  );
};

const CustomHeader: React.FC = () => {
  return <h1 style={{ height: 48, lineHeight: '48px', textAlign: 'center' }}>GI-SDK</h1>;
};

const CustomCanvasComponent: React.FC = () => {
  const [, updateGlobalModel] = useGlobalModel();
  const graph = useGraph();

  useEventSubscribe<IPointerEvent<Node>>(NodeEvent.CLICK, e => {
    const nodeId = e.target.id;
    updateGlobalModel({ currentNode: graph?.getNodeData(nodeId), panel: true });
  });

  useEventSubscribe(CanvasEvent.CLICK, e => {
    updateGlobalModel({ currentNode: null, panel: false });
  });

  return null;
};

registerWidget('custom-sidebar', CustomSidebar);
registerWidget('custom-panel', CustomPanel);
registerWidget('custom-header', CustomHeader);
registerWidget('custom-canvas-component', CustomCanvasComponent);

const Demo: React.FC = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('https://assets.antv.antgroup.com/g6/graph.json')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const graphinProps: GraphinProps = useMemo(
    () => ({
      options: {
        autoResize: true,
        data,
        layout: { type: 'd3-force' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select', 'hover-activate'],
        animation: false,
      },
    }),
    [data],
  );

  const widgets: WidgetItem[] = [
    {
      name: 'custom-header',
      slot: 'header',
    },
    {
      name: 'custom-sidebar',
      slot: 'sider',
    },
    {
      name: 'custom-panel',
      slot: 'panel',
      properties: {
        count: 100,
      },
    },
    {
      name: 'custom-canvas-component',
      slot: 'canvas',
    },
  ];

  if (!data) return <Spin />;

  return <GISDK graph={graphinProps} widgets={widgets}></GISDK>;
};

ReactDOM.render(<Demo />, document.getElementById('root'));
