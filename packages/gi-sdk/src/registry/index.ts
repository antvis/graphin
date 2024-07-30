import type { AssetPackage, ImplementService, ImplementWidget } from '../types';

class RegistryManager {
  public widgets = new Map<string, ImplementWidget>();

  public services = new Map<string, ImplementService>();

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
      const empty = {
        metadata: { name: '' },
        version: '0.1',
        component: () => `Widget with name ${name} not found.`,
      };
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
   * 注册服务
   * @param service - 服务
   * @param override - 是否覆盖同名服务
   */
  public registerService(service: ImplementService, override = false) {
    const name = service.metadata.name;
    if (!override && this.services.has(name)) {
      // eslint-disable-next-line no-console
      console.warn(`Service with name ${name} already exists. Use override flag to replace it.`);
    } else {
      this.services.set(name, service);
    }
  }

  /**
   * 根据名称获取服务
   * @param name - 服务名称
   * @returns 服务
   */
  public getService(name: string): ImplementService {
    const s = this.services.get(name);
    if (!s) {
      const empty = {
        metadata: { name: '' },
        version: '0.1',
        service: () => Promise.resolve(`Service with name ${name} not found.`),
      };
      // eslint-disable-next-line no-console
      console.error(`[gi-sdk]: Service with name ${name} not found.`);
      return empty as ImplementService;
    }
    return s;
  }

  public getServices() {
    return this.services;
  }

  /**
   * 安装资产包
   * @param asset - 资产包
   */
  public installAsset(asset: AssetPackage) {
    asset.widgets?.forEach((widget) => this.registerWidget(widget));
    asset.services?.forEach((service) => this.registerService(service));
  }
}

export default RegistryManager;
