import {
  ApartmentOutlined,
  AppstoreFilled,
  BranchesOutlined,
  ChromeFilled,
  CopyrightCircleFilled,
  ShareAltOutlined,
} from '@ant-design/icons';
import type { Graph, SingleLayoutOptions } from '@antv/g6';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Graphin, GraphinContext } from '../src';
import { ContextMenu, LayoutSelector } from '../src/components';
import { Menu } from 'antd';

const data = {
  nodes: [
    { id: 'node0', data: {} },
    { id: 'node1', data: {} },
    { id: 'node2', data: {} },
    { id: 'node3', data: {} },
    { id: 'node4', data: {} },
    { id: 'node5', data: {} },
    { id: 'node6', data: {} },
    { id: 'node7', data: {} },
    { id: 'node8', data: {} },
    { id: 'node9', data: {} },
    { id: 'node10', data: {} },
    { id: 'node11', data: {} },
    { id: 'node12', data: {} },
    { id: 'node13', data: {} },
    { id: 'node14', data: {} },
    { id: 'node15', data: {} },
    { id: 'node16', data: {} },
  ],
  edges: [
    { id: 'edge0', source: 'node0', target: 'node1' },
    { id: 'edge1', source: 'node0', target: 'node2' },
    { id: 'edge2', source: 'node0', target: 'node3' },
    { id: 'edge3', source: 'node0', target: 'node4' },
    { id: 'edge4', source: 'node0', target: 'node5' },
    { id: 'edge5', source: 'node1', target: 'node6' },
    { id: 'edge6', source: 'node1', target: 'node7' },
    { id: 'edge7', source: 'node2', target: 'node8' },
    { id: 'edge8', source: 'node2', target: 'node9' },
    { id: 'edge9', source: 'node2', target: 'node10' },
    { id: 'edge10', source: 'node2', target: 'node11' },
    { id: 'edge11', source: 'node2', target: 'node12' },
    { id: 'edge12', source: 'node2', target: 'node13' },
    { id: 'edge13', source: 'node3', target: 'node14' },
    { id: 'edge14', source: 'node3', target: 'node15' },
    { id: 'edge15', source: 'node3', target: 'node16' },
  ],
};

const NodeContextMenu = () => {
  const graphin = useContext(GraphinContext);

  const handleClick = () => {
    const {node: {handleClose, item}} = graphin.contextmenu;
    console.log({item})
    handleClose();
  };
  return <Menu selectedKeys={[]} onClick={handleClick} mode="vertical">
  <Menu.Item key="10">
    展开10个关联节点
  </Menu.Item>
  <Menu.Item key="20">展开20个关联节点</Menu.Item>
  <Menu.Item key={'all'}>展开全部关联节点</Menu.Item>
</Menu>
}
const layouts = [
  {
    type: 'force',
    label: '经典力导布局',
    icon: <CopyrightCircleFilled />,
  },
  {
    type: 'grid',
    label: '网格布局',
    icon: <AppstoreFilled />,
  },
  {
    type: 'circular',
    label: '圆形布局',
    icon: <BranchesOutlined />,
  },
  {
    type: 'radial',
    label: '径向布局',
    icon: <ShareAltOutlined />,
  },
  {
    type: 'concentric',
    label: '同心圆布局',
    maxLevelDiff: 0.5,
    sortBy: 'degree',
    icon: <ChromeFilled />,
  },
  {
    type: 'dagre',
    label: '层次布局',
    rankdir: 'LR',
    icon: <ApartmentOutlined />,
  },
];

const Demo: React.FC = () => {
  const [layout, setLayout] = useState<SingleLayoutOptions>(layouts[0]);
  const [graph, setGraph] = useState<Graph | null>(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('graph instance', graph);
  }, [graph]);

  return (
    <Graphin
      ref={(r) => {
        setGraph(r);
      }}
      id="graphin-demo"
      className="graphin-container"
      style={{ width: '100%', height: '100%' }}
      options={{
        autoResize: true,
        data,
        layout,
        behaviors: ['zoom-canvas', 'drag-canvas'],
      }}
    >
      <LayoutSelector
        onChange={(value) => setLayout(layouts.find((layout) => layout.type === value)!)}
        options={layouts}
        value={layout.type}
      />
      <ContextMenu >
          <NodeContextMenu />
      </ContextMenu>
      <ContextMenu bindType='edge'>
          <ContextMenu.Menu>
            <ContextMenu.Menu.Item>边菜单1</ContextMenu.Menu.Item>
            <ContextMenu.Menu.Item>边菜单2</ContextMenu.Menu.Item>
          </ContextMenu.Menu>
      </ContextMenu>
      <ContextMenu bindType='canvas' >
          <ContextMenu.Menu>
            <ContextMenu.Menu.Item>画布菜单1</ContextMenu.Menu.Item>
            <ContextMenu.Menu.Item>画布菜单2</ContextMenu.Menu.Item>
          </ContextMenu.Menu>
      </ContextMenu>
    </Graphin>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Demo />);
