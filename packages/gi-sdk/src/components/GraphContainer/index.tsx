import type { Graph as G6Graph } from '@antv/g6';
import { Graphin } from '@antv/graphin';
import classnames from 'classnames';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { PREFIX } from '../../constants';
import { useDataset, useGraph, useGraphOptions } from '../../hooks';
import { isLocalDataset } from '../../utils/dataset';
import './index.less';

export interface GraphContainerProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'id' | 'className' | 'style'> {}

export const GraphContainer: React.FC<PropsWithChildren<GraphContainerProps>> = (props) => {
  const { className, style, children } = props;
  const [options, setOptions] = useGraphOptions();
  const [, setGraphInstance] = useGraph();
  const [isReady, setIsReady] = useState(false);
  const [dataset] = useDataset();
  const graphRef = useRef<G6Graph | null>(null);

  useEffect(() => {
    if (!isReady || !graphRef.current || graphRef.current.destroyed) return;

    setGraphInstance(graphRef.current);
  }, [isReady]);

  useEffect(() => {
    if (isLocalDataset(dataset)) {
      setOptions({
        data: dataset.data,
      });
    }
  }, [dataset]);

  return (
    <div className={classnames(`${PREFIX}-graph-container`, className)}>
      <Graphin ref={graphRef} style={style} options={options} onInit={() => setIsReady(true)}>
        {children}
      </Graphin>
    </div>
  );
};
