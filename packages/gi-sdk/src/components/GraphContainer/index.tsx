import type { Graph as G6Graph } from '@antv/g6';
import { Graphin } from '@antv/graphin';
import classnames from 'classnames';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useGraph, useGraphOptions } from '../../hooks';

export interface GraphContainerProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'id' | 'className' | 'style'> {}

export const GraphContainer: React.FC<PropsWithChildren<GraphContainerProps>> = (props) => {
  const { className, style, children } = props;
  const [options] = useGraphOptions();
  const [, setGraphInstance] = useGraph();
  const [isReady, setIsReady] = useState(false);

  const graphRef = useRef<G6Graph | null>(null);

  useEffect(() => {
    if (!isReady || !graphRef.current || graphRef.current.destroyed) return;

    setGraphInstance(graphRef.current);
  }, [isReady]);

  return (
    <Graphin
      ref={graphRef}
      className={classnames('gi-sdk-graph-container', className)}
      style={style}
      options={options}
      onInit={() => setIsReady(true)}
    >
      {children}
    </Graphin>
  );
};
