import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { Graphin, GraphinProps } from '@antv/graphin';
import React, { useEffect, useMemo, useState } from 'react';
import { PREFIX } from '../../constant';
import { Header, Panel, Sider } from './components';

type Slot = 'header' | 'sider' | 'panel' | 'canvas';

export interface MyAppLayoutProps extends ImplementWidgetProps<Slot> {
  showHeader: boolean;
}

export const MyAppLayout: React.FC<MyAppLayoutProps> = (props) => {
  const { slotElements, showHeader } = props;
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('https://assets.antv.antgroup.com/g6/graph.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const options: GraphinProps['options'] = useMemo(
    () => ({
      autoResize: true,
      data,
      layout: { type: 'd3-force' },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select', 'hover-activate'],
      animation: false,
      autoFit: 'view',
    }),
    [data],
  );

  return (
    <div className={`${PREFIX}-container`}>
      {showHeader && <Header>{slotElements.header}</Header>}
      <div className={`${PREFIX}-content`}>
        <Sider>{slotElements.sider}</Sider>
        <div className={`${PREFIX}-scene`}>
          <Graphin className={`${PREFIX}-graphin-container`} options={options}>
            {slotElements.canvas}
          </Graphin>
        </div>
        <Panel>{slotElements.panel}</Panel>
      </div>
    </div>
  );
};
