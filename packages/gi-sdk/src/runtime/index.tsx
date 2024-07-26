import React, { memo } from 'react';
import type { GIContextProps } from '../context';
import { GIContext } from '../context';
import type { GlobalModel } from '../context/types';
import RegistryManager from '../registry';
import StateManager from '../state';
import type { AssetPackage } from '../types';
import type { GIRenderProps } from './Render';
import { GIRender } from './Render';
import type { RuntimeContext } from './types';

export interface GIRuntimeAppProps {
  /**
   * 图应用资产包
   */
  assets?: AssetPackage[];
  /**
   * 初始全局状态
   */
  initialGlobalState?: GlobalModel;
}

export class GIRuntimeApp {
  public context: RuntimeContext = {};

  public App: React.FC<GIRenderProps>;

  constructor({ assets, initialGlobalState }) {
    this.initRuntime(assets, initialGlobalState);

    this.App = this.getApp();
  }

  private initRuntime(assets: AssetPackage[], initialGlobalState: GlobalModel) {
    if (!this.context.registry) this.context.registry = new RegistryManager(assets);
    if (!this.context.state) this.context.state = new StateManager(initialGlobalState);
  }

  private getApp() {
    const { registry, state } = this.context;

    return memo((props: GIRenderProps) => {
      state?.initState(props.config);

      const contextValue = { registry, state } as GIContextProps;

      return (
        <GIContext.Provider value={contextValue}>
          <GIRender {...props} />
        </GIContext.Provider>
      );
    });
  }
}
