import React from 'react';
import type RegistryManager from '../registry';

export interface GIContextProps {
  registry: RegistryManager;
}

export const GIContext = React.createContext<GIContextProps>(null as any);

export const useGIContext = () => {
  const context = React.useContext(GIContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error('useGIContext must be used within a GIContext.Provider');
  }
  return context;
};
