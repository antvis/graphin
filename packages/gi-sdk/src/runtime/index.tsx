import React, { memo } from 'react';
import type { GIContextProps } from '../context';
import { GIContext } from '../context';
import RegistryManager from '../registry';
import type { AssetPackage } from '../types';
import type { GIRenderProps } from './Render';
import { GIRender } from './Render';
import type { RuntimeContext } from './types';

export interface GIRuntimeAppProps {
  /**
   * 图应用资产包
   */
  assets?: AssetPackage[];
}

export class GIRuntimeApp {
  public context: RuntimeContext = {};

  public App: React.FC<GIRenderProps>;

  constructor({ assets }) {
    this.initRuntime(assets);

    this.App = this.getApp();
  }

  private initRuntime(assets: AssetPackage[]) {
    if (!this.context.registry) this.context.registry = new RegistryManager(assets);
  }

  private getApp() {
    const { registry } = this.context;

    const contextValue = { registry } as GIContextProps;

    return memo((props: GIRenderProps) => {
      return (
        <GIContext.Provider value={contextValue}>
          <GIRender {...props} />
        </GIContext.Provider>
      );
    });
  }
}
