import { CanvasEvent, NodeEvent } from '@antv/g6';
import type { AssetPackage, ImplementWidget, ImplementWidgetProps } from '@antv/gi-sdk';
import {
  useEventPublish,
  useEventSubscribe,
  useGlobalModel,
  useGraph,
  useGraphOptions,
  useWidgetProps,
} from '@antv/gi-sdk';
import { Button, Space } from 'antd';
import React, { useEffect } from 'react';
import { MyAppLayout } from './MyAppLayout';

const fontStyle = {
  fontSize: 24,
  color: 'green',
};

const AppTitle: ImplementWidget<ImplementWidgetProps> = {
  version: '0.1',
  metadata: {
    name: 'AppTitle',
    displayName: '应用名',
    description: '应用名',
  },
  component: () => {
    return (
      <div style={{ height: 48, fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        GI-SDK 测试应用
      </div>
    );
  },
};

const GraphOptionTester: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'GraphOptionTester',
    displayName: '图表配置测试资产',
    description: '测试图表配置的变化',
  },
  component: () => {
    const [, updateOptions] = useGraphOptions();

    const changeGraphLayout = () => {
      updateOptions((options) => ({ ...options, layout: { type: 'dagre' } }));
    };

    return (
      <Space direction="vertical" style={{ margin: '24px 0' }}>
        <Button onClick={changeGraphLayout}>Update graph option [layout]</Button>
      </Space>
    );
  },
};

const GlobalStateTester: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'GlobalStateTester',
    displayName: '全局状态测试资产',
    description: '测试全局状态的变化',
  },
  component: () => {
    const [{ panel }, setGlobalModel] = useGlobalModel();
    const [, updatePanelProperties] = useWidgetProps('float-panel-content');

    const openPanel = () => {
      setGlobalModel((prev) => ({ ...prev, panel: true }));
    };

    const changePanelCount = () => {
      updatePanelProperties({ count: Math.floor(Math.random() * 1000) });
    };

    return (
      <Space direction="vertical" style={{ margin: '24px 0' }}>
        <Button onClick={openPanel}>修改全局状态来打开浮动面板</Button>
        <p>
          FloatPanel now is <b style={fontStyle}>{panel ? 'opened' : 'closed'}</b>
        </p>

        <Button onClick={changePanelCount}>Update panel props [Count]</Button>
      </Space>
    );
  },
};

const EventBusTester: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'EventBusTester',
    displayName: '事件总线测试资产',
    description: '采用事件机制进行组件间通信',
  },
  component: () => {
    const [{ a = 0 }, setGlobalModel] = useGlobalModel();
    const emit = useEventPublish();

    useEventSubscribe('custom-sidebar:change', () => {
      setGlobalModel((prev) => ({ ...prev, a: Math.floor(Math.random() * 1000) }));
    });

    const triggerChange = () => {
      emit('custom-sidebar:change');
    };

    return (
      <Space direction="vertical" style={{ margin: '24px 0' }}>
        <Button onClick={triggerChange}>触发自定义事件来修改变量</Button>
        <div>
          Value of variable a is <b style={fontStyle}>{a}</b>
        </div>
      </Space>
    );
  },
};

const FloatPanelContent: ImplementWidget<ImplementWidgetProps & { count: number }> = {
  version: '0.1',
  metadata: {
    name: 'FloatPanelContent',
    displayName: '浮动面板内容',
    description: '浮动面板内容',
  },
  component: (props) => {
    const { count } = props;
    const [{ currentNode, sider: isSiderOpen }] = useGlobalModel();

    return (
      <div>
        <p>
          Count: <b style={fontStyle}>{count}...</b>
        </p>
        <p>SidePanel now is {isSiderOpen ? <b style={fontStyle}>opened</b> : <b style={fontStyle}>closed</b>}</p>
        <p>
          Current node: <b style={fontStyle}>{currentNode?.id}</b>
        </p>
      </div>
    );
  },
};

const ClickNodeWidget: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'ClickNodeWidget',
    displayName: '点击节点',
    description: '点击节点',
  },
  component: () => {
    const [, setGlobalModel] = useGlobalModel();
    const [graph] = useGraph();

    useEffect(() => {
      if (!graph || graph.destroyed) return;

      const clickNode = (e) => {
        const nodeId = e.target.id;
        setGlobalModel((prev) => ({ ...prev, currentNode: graph?.getNodeData(nodeId), panel: true }));
      };

      const clickCanvas = () => {
        setGlobalModel((prev) => ({ ...prev, currentNode: null, panel: false }));
      };

      graph.on(NodeEvent.CLICK, clickNode);
      graph.on(CanvasEvent.CLICK, clickCanvas);

      return () => {
        graph.off(NodeEvent.CLICK, clickNode);
        graph.off(CanvasEvent.CLICK, clickCanvas);
      };
    }, [graph]);

    return null;
  },
};

export const myAssetPackage: AssetPackage = {
  version: '0.1',
  widgets: [
    AppTitle,
    ClickNodeWidget,
    FloatPanelContent,
    EventBusTester,
    GlobalStateTester,
    GraphOptionTester,
    MyAppLayout,
  ] as ImplementWidget<ImplementWidgetProps>[],
};
