import type { AssetPackage, ImplementWidget } from '../types';

class RegistryManager {
  public widgets = new Map<string, ImplementWidget>();

  constructor(assets: AssetPackage[]) {
    assets.forEach((asset) => this.installAsset(asset));
  }

  /**
   * 注册组件资产
   * @param widget - 组件资产
   * @param override - 是否覆盖同名组件
   */
  public registerWidget(widget: ImplementWidget, override = false) {
    const name = widget.metadata.name;
    if (!override && this.widgets.has(name)) {
      // eslint-disable-next-line no-console
      console.warn(`Widget with name ${name} already exists. Use override flag to replace it.`);
    } else {
      this.widgets.set(name, widget);
    }
  }

  /**
   * 获取组件资产
   * @param name - 组件名称
   * @returns 组件资产
   */
  public getWidget(name: string): ImplementWidget {
    const w = this.widgets.get(name);
    if (!w) {
      const empty = { metadata: { name: '' }, version: 'v0.1', component: () => `Widget with name ${name} not found.` };
      // eslint-disable-next-line no-console
      console.error(`[gi-sdk]: Widget with name ${name} not found.`);
      return empty as ImplementWidget;
    }
    return w;
  }

  public getWidgets() {
    return this.widgets;
  }

  /**
   * 安装资产包
   * @param asset - 资产包
   */
  public installAsset(asset: AssetPackage) {
    asset.widgets.forEach((widget) => this.registerWidget(widget));
  }
}

export default RegistryManager;
