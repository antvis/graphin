import { CanvasEvent, NodeEvent } from '@antv/g6';
import { $i18n } from '@antv/gi-core-assets';
import type { AssetPackage, ImplementWidget, ImplementWidgetProps } from '@antv/gi-sdk';
import { useGlobalModel, useGraph } from '@antv/gi-sdk';
import React, { useEffect } from 'react';
import strings from './i18n/strings';

const fontStyle = {
  fontSize: 24,
  color: 'green',
};

const AppTitle: ImplementWidget<ImplementWidgetProps<'navbar'>> = {
  version: '0.1',
  metadata: {
    name: 'AppTitle',
    displayName: $i18n.t('core-assets.widgets.app-title.component.metadata.displayName'),
    description: $i18n.t('core-assets.widgets.app-title.component.metadata.description'),
  },
  component: (props) => {
    const { slotElements } = props;
    return (
      <div className="app-title">
        <div className="app-title-content">
          {$i18n.t({ id: 'core-assets.widgets.app-title.component.app.title', defaultMessage: '测试应用' })}
        </div>
        <div className="app-title-navbar">{slotElements.navbar}</div>
      </div>
    );
  },
};

const LanguageSwitcher: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'LanguageSwitcher',
    displayName: $i18n.t('core-assets.widgets.language-switcher.metadata.displayName'),
    description: $i18n.t('core-assets.widgets.language-switcher.metadata.description'),
  },
  component: () => {
    const switchLanguage = () => {
      $i18n.changeLanguage($i18n.language === 'en-US' ? 'zh-CN' : 'en-US');
      window.location.reload();
    };

    return (
      <a style={{ right: 0 }} onClick={switchLanguage}>
        {$i18n.t('core-assets.widgets.language-switcher.component.language')}
      </a>
    );
  },
};

const Copyright: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'Copyright',
    displayName: $i18n.t('core-assets.widgets.copyright.component.metadata.displayName'),
    description: $i18n.t('core-assets.widgets.copyright.component.metadata.description'),
  },
  component: () => {
    return <div className="copyright">2024 Your Company Name. All rights reserved.</div>;
  },
};

const ShowSelectedContent: ImplementWidget<ImplementWidgetProps & { count: number }> = {
  version: '0.1',
  metadata: {
    name: 'ShowSelectedContent',
    displayName: '展示选中节点信息',
  },
  component: () => {
    const [{ currentNode }] = useGlobalModel();
    return (
      <div>
        Current node: <b style={fontStyle}>{currentNode?.id}</b>
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
    const [, setCurrentNode] = useGlobalModel('currentNode');
    const [, setPanel] = useGlobalModel('panel');
    const [graph] = useGraph();

    useEffect(() => {
      if (!graph || graph.destroyed) return;

      const clickNode = (e) => {
        const nodeId = e.target.id;
        setCurrentNode(graph?.getNodeData(nodeId));
        setPanel(true);
      };

      const clickCanvas = () => {
        setCurrentNode(null);
        setPanel(false);
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

$i18n.loadResources(strings);

export const myAssetPackage: AssetPackage = {
  version: '0.1',
  widgets: [
    AppTitle,
    Copyright,
    ClickNodeWidget,
    ShowSelectedContent,
    LanguageSwitcher,
  ] as ImplementWidget<ImplementWidgetProps>[],
};
