import React from 'react';
import type { GISDKContextProps, GlobalModel, WidgetItem } from '../types';

export const GISDKContext = React.createContext<GISDKContextProps>({
  graph: null,
  isReady: false,
  globalModel: {},
  setGlobalModel: () => {},
  widgets: [],
  setWidgets: () => {},
});

export const useGISDK = () => {
  const context = React.useContext(GISDKContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error('useGISDK must be used within a GISDKProvider.');
  }
  return context;
};

/**
 * The hook to get the G6 graph instance.
 * @returns The G6 graph instance.
 */
export const useGraph = () => useGISDK().graph;

/**
 * The hook to operate the global model.
 * @returns The global model and the setter of the global model.
 */
export const useGlobalModel = () => {
  const { globalModel, setGlobalModel } = useGISDK();

  const updateGlobalModel = (newModel: Partial<GlobalModel>) => {
    setGlobalModel(prev => ({ ...prev, ...newModel }));
  };

  return [globalModel, updateGlobalModel] as const;
};

/**
 * The hook to organize the widgets.
 * @returns The widgets and the setter of the widgets.
 */
export const useWidgets = () => {
  const { widgets, setWidgets } = useGISDK();

  const updateWidget = (newWidget: Partial<WidgetItem>) => {
    setWidgets(prevWidgets =>
      prevWidgets.map(widget => (widget.name === newWidget.name ? { ...widget, ...newWidget } : widget)),
    );
  };

  return [widgets, updateWidget, setWidgets] as const;
};
