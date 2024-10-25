import { useGraphin } from '../../context';
import React, { CSSProperties, useEffect } from 'react';

import { Graph } from '@antv/g6';
import { Menu } from 'antd';



interface IG6GraphEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
const defaultStyle: CSSProperties = {
  width: 200,
  background: '#fff',
};

interface ContextMenuProps {
  children: React.ReactNode | JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  bindType?: 'node' | 'edge' | 'canvas';
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type PositionStyle = CSSProperties.Pick<CSSProperties, 'position' | 'left' | 'top'  | 'right' | 'bottom'| 'opacity'>;
interface State {
  /** 触发的元素 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: IG6GraphEvent['item'];
  positionStyle?: PositionStyle;
}

type BindType = 'node'  | 'edge' | 'canvas';

// eslint-disable-next-line jsdoc/require-description
/**
 * @description 获取右键菜单点击位置
 * @param e g6 事件
 * @param param.graph
 * @param param.bindType
 * @param param.elementId
 * @param param.graph
 * @param param.bindType
 * @param param.elementId
 * @param param.graph
 * @param param.bindType
 * @param param.elementId
 * @param param {graph, bindType, elementId}
 * @returns 
 */
const getPointPosition = (e: IG6GraphEvent, {graph, bindType, elementId}: {graph: any; bindType: BindType; elementId: string | null}) => {
  e.preventDefault();
  let pointPosition = [0, 0]
  if (bindType === 'node') {
    // @ts-ignore
    pointPosition = graph?.getElementPosition(elementId);
  } else if (bindType === 'edge') {
    const edge = graph?.getEdgeData(elementId);
    const targetNodePosition = graph?.getElementPosition(edge?.target);
    const sourceNodePosition = graph?.getElementPosition(edge?.source); 
    pointPosition = [(targetNodePosition[0] + sourceNodePosition[0]) / 2, (targetNodePosition[1] + sourceNodePosition[1]) / 2];
  } else {
    const {canvas} = e
    pointPosition = [canvas.x, canvas.y];
  }
  return pointPosition;
}

const getContextMenuPositionStyle = (graph: Graph, pointPosition: [number, number], bindType: BindType) => {

  const position = graph?.getPosition();
  const zoom = graph?.getZoom();
  const [left, top] = [
    (pointPosition[0] + position[0]) * zoom,
    (pointPosition[1] + position[1]) * zoom,
  ] as [number, number];
  const elm = document.getElementById(`graphin-components-${bindType}-contextmenu`) as HTMLElement;
  const contextmenuBoxStyleWidth = Number(
    getComputedStyle(elm).width.replace('px', ''),
  );
  const contextmenuBoxStyleHeight = Number(
    getComputedStyle(elm).height.replace('px', ''),
  );
  const [width, height] = graph?.getSize() as [number, number];
  const right = width - left - contextmenuBoxStyleWidth;
  const bottom = height - top - contextmenuBoxStyleHeight;
  let positionStyle: PositionStyle = {
    position: 'absolute',
    opacity: 1,
    left,
    top,
  };
  /**
   * 边界溢出判断
   */
  if(right < 0 && bottom < 0) { 
    positionStyle = {
      position: 'absolute',
      opacity: 1,
      right: right + contextmenuBoxStyleWidth,
      bottom: bottom + contextmenuBoxStyleHeight,
    }
  }
  if(right < 0 && bottom > 0) { 
    positionStyle = {
      position: 'absolute',
      opacity: 1,
      right: right + contextmenuBoxStyleWidth,
      top,
    }
    
  }
  if(right > 0 && bottom < 0) {
    positionStyle = {
      position: 'absolute',
      opacity: 1,
      left,
      bottom: bottom + contextmenuBoxStyleHeight,
    }
  }
  return positionStyle
}

export const ContextMenu: React.FunctionComponent<ContextMenuProps> & {
  Menu: typeof Menu;
} = (props) => {
  const { children, bindType = 'node', style = {} } = props;
  const graphin = useGraphin();
  const { graph } = graphin

  const [state, setState] = React.useState<State>({
    item: null,
    positionStyle: {
      opacity: 0,
      top: 0,
      left: 0,
      position: 'absolute',
    },
  });
  const handleShow = (e: IG6GraphEvent) => {
    e.preventDefault();
    if(!graph) return;
    const {
      target: { id },
    } = e;
    const pointPosition = getPointPosition(e, {graph, bindType, elementId: id || null});
    const positionStyle = getContextMenuPositionStyle(graph, pointPosition as [number, number], bindType);

    let item = null;
    if (bindType === 'node' || bindType === 'edge') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item = graph?.getElementData(id);
    }
    
    setState(() => {
      return {
        visible: true,
        positionStyle,
        item: item,
      };
    });
  };
  const handleClose = () => {
    setState(() => {
      return {
        positionStyle: {
          position: 'absolute',
          opacity: 0,
          top: 0,
          left: 0,
        },
      };
    });
  };

  useEffect(() => {
    if (!graph) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    graph.on(`${bindType}:contextmenu`, handleShow);
    graph.on('canvas:click', handleClose);
    graph.on('canvas:drag', handleClose);
    graph.on('wheel', handleClose);

    return () => {
      graph.off(`${bindType}:contextmenu`, handleShow);
      graph.off('canvas:click', handleClose);
      graph.off('canvas:drag', handleClose);
      graph.off('wheel', handleClose);
    };
  }, []);
  const { item, positionStyle } = state;

  /** 将一些方法和数据传递给子组件 */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  graphin.contextmenu = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...graphin.contextmenu,
    [bindType]: {
      handleOpen: handleShow,
      handleClose,
      item,
      bindType,
    },
  };

  return (
    <div
      className="graphin-components-contextmenu"
      style={{
        ...defaultStyle,
        ...style,
        ...positionStyle,
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
      }}
      id={`graphin-components-${bindType}-contextmenu`}
    >
      {children}
    </div>
  );
};
ContextMenu.Menu = Menu;

