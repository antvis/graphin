import type EventEmitter from '@antv/event-emitter';
import React from 'react';
import type RegistryManager from '../registry';
import type StateManager from '../state';

export interface GIContextProps {
  registry: RegistryManager;
  state: StateManager;
  eventBus: EventEmitter;
}

export const GIContext = React.createContext<GIContextProps>(null as any);

export const useGIContext = () => {
  const context = React.useContext(GIContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error('useGIContext must be used within a GIContext.Provider');
  }
  return context;
};
