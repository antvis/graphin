import React, { useRef, useState } from 'react';
import { Graphin } from '@antv/graphin';
import type { Graph as G6Graph } from '@antv/g6';
import { PREFIX } from './constants';
import { Panel, Sider, Header } from './assets';
import { useComponent } from './hooks';
import type { GISDKProps, GlobalModel, WidgetItem } from './types';
import { GISDKContext } from './context';
import './index.less';

const defaultGlobalModel: Partial<GlobalModel> = { sider: true, panel: false };

export const GISDK: React.FC<GISDKProps> = props => {
  const { graph: graphinProps } = props;
  const graphRef = useRef<G6Graph | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [globalModel, setGlobalModel] = useState<GlobalModel>(defaultGlobalModel);

  const [widgets, setWidgets] = useState<WidgetItem[]>(props.widgets);
  const { renderComponents } = useComponent(widgets);

  return (
    <GISDKContext.Provider
      value={{ graph: graphRef.current, isReady, globalModel, setGlobalModel, widgets, setWidgets }}
    >
      <div className={`${PREFIX}-container`}>
        <Header>{isReady && renderComponents('header')}</Header>
        <div className={`${PREFIX}-content`}>
          <Sider>{isReady && renderComponents('sider')}</Sider>
          <div className={`${PREFIX}-scene`}>
            <Graphin
              className={`${PREFIX}-graphin-container`}
              {...graphinProps}
              ref={graphRef}
              onInit={(graph: G6Graph) => {
                setIsReady(true);
                graphinProps.onInit?.(graph);
              }}
            >
              {renderComponents('canvas')}
            </Graphin>
          </div>
          <Panel>{isReady && renderComponents('panel')}</Panel>
        </div>
      </div>
    </GISDKContext.Provider>
  );
};
