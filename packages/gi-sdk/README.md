<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<p align="center">
  <a href="https://github.com/antvis/graphin">
    <img width="150" src="https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg">
  </a>
</p>

<h1 align="center">GISDK</h1>

<div align="center">

SDK for Graph Insight Application based on [G6](https://github.com/antvis/G6).

[![Version](https://img.shields.io/npm/v/@antv/gi-sdk)](https://www.npmjs.com/@antv/gi-sdk)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/gi-sdk.svg)](http://npmjs.com/@antv/gi-sdk)
![Latest commit](https://badgen.net/github/last-commit/antvis/graphin)

</div>

## ✨ 功能特性

- 🎗️ **React 风格**：舒心的开发体验，符合 React 用户心智，基于 React 扩展组件更容易。
- 📜 **配置管理**：通过应用配置文件全面定制图应用，包括元数据、数据集、画布和组件配置，满足多样化需求。
- 🌐 **多种数据源支持**：支持本地和远程数据集，轻松拉取多种数据源。
- 🧩 **可定制的组件结构**：灵活的组件结构，用户可按需开发和扩展自定义组件和服务资产，满足复杂业务场景。
- 🔌 **易于上手**：内置多种 API 和 Hooks，让图实例获取、组件间通信和状态管理更简单。

## 🔨 快速使用

将 `GISDK` 作为一个普通的 React 组件使用，通过 NPM 或 Yarn 安装。

```bash
$ npm install @antv/gi-sdk
# or
$ yarn add @antv/gi-sdk
```

使用应用配置描述文件 `config` 和资产包 `assets` 来渲染图应用。

```jsx
import React from 'react';
import { GISDK } from '@antv/gi-sdk';
import { myAssetPackage } from './assets';
import { config } from './config';

export default () => {
  const assets = [myAssetPackage];

  return <GISDK className="my-graph-application" style={{ height: '80vh' }} config={config} assets={assets} />;
};
```

## 📖 API 参考

| 属性               | 描述                            | 类型                                                                                               | 默认值 |
| ------------------ | ------------------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| className          | 设置图应用容器的 class 属性     | `string`                                                                                           | -      |
| style              | 设置图应用容器的 style 样式属性 | `CSSProperties`                                                                                    | -      |
| config             | 图应用配置描述                  | [`Application`](https://github.com/antvis/Graphin/blob/v3/packages/gi-sdk/src/spec/application.ts) | -      |
| assets             | 渲染图应用使用的资产包          | [`AssetPackage[]`](https://github.com/antvis/Graphin/blob/v3/packages/gi-sdk/src/types/asset.ts)   | -      |
| initialGlobalState | 初始全局扩展状态                | [`GlobalModel`](https://github.com/antvis/Graphin/blob/v3/packages/gi-sdk/src/context/types.ts)    | -      |

## ⚡️ 搭建你的图应用

### 1. 配置图应用

定义图应用的版本号、元数据信息、数据集配置、图画布配置和组件配置。

```js
const config: Application = {
  version: '0.1',
  metadata: {
    name: '测试应用',
  },
  dataset: { ... }, // [见 2.1]
  spec: {
    graph: { ... },  // [见 2.2]
    widgets: [ ... ]  // [见 2.3]
  }
 };
```

#### 2.1 数据集配置

支持两种形态：本地数据集以及远程数据集。远程数据集需要配合服务资产使用，最后获取到的数据会内部托管到图上。

```js
dataset: {
  id: 'local-dataset-id',
  type: 'local',
  data: { /** Graph Data */ },
}
// or
dataset: {
  id: 'remote-dataset-id',
  type: 'remote',
  serviceType: 'FetchData',
  properties: {
    url: 'https://assets.antv.antgroup.com/g6/cluster.json',
  },
}
```

#### 2.2 图画布配置

图画布的配置请参考 [G6 配置](https://g6.antv.antgroup.com/) 文档。

```js
spec: {
  graph: {
    /** G6 Options */
  }
}
```

#### 2.3 组件配置

指定需要在应用上挂载的组件集合，并通过 slot 机制管理组件间的父子关系，进行灵活排布。

```js
spec: {
  widgets: [
    /** Widgets Configs */
  ];
}
```

> 对于从 2.x 版本升级的用户，2.x 版本中资产被划分为布局资产、容器资产、自运行资产和原子资产。在新版设计中，我们模糊了这些概念，通过 slot 驱动的方式来渲染和组织组件树，依旧可以做到上述能力。

##### Slot 机制

Slot 是用来将组件插入特定位置的插槽；通过 slot，可以灵活地组织组件的布局。

1. **定义 slots**

   为容器组件定义多个 slot，例如 toolbar。这个 slot 就像一个预留的插槽，等待具体的组件插入。

   ```js
   {
     widgets: [
       {
         id: 'toolbar',
         type: 'Toolbar', // 对应资产的 metadata.name
         slots: {
           default: [ ... ],
         },
       }
     ]
   }
   ```

2. **绑定组件到 Slot**

   将组件绑定到相应的 slot。绑定是通过组件的 ID 来实现的。例如，将 zoom-in 和 zoom-out 组件绑定到 toolbar slot。

   ```js
   {
     widgets: [
       {
         id: 'toolbar',
         type: 'Toolbar',
         slots: {
           default: ['zoom-in', 'zoom-out'],
         },
       },
       {
         id: 'zoom-in',
         type: 'ZoomInButton',
       },
       {
         id: 'zoom-out',
         type: 'ZoomOutButton',
       },
     ];
   }
   ```

3. **容器组件中的具体实现**

   在父组件中，使用 `slotElements` 属性将子组件插入到相应的 slot 中。

   ```jsx
   export default (props) => {
     const { slotElements } = props;

     return <div className="toolbar">{slotElements.default}</div>;
   };
   ```

### 2. 渲染图应用

```jsx
import React from 'react';
import { GISDK } from '@antv/gi-sdk';
import GICoreAssets from '@antv/gi-core-assets'; // 官方提供的核心资产包
import { MyAssetPackage } from './asset'; // 本地资产包
import { config } from './config';

export default function () {
  const assets = [GICoreAssets, MyAssetPackage];

  return <GISDK config={config} assets={assets} />;
}
```

> 完整示例代码见 [demo](https://github.com/antvis/Graphin/tree/v3/packages/gi-core-assets/docs)

## 🔮 自定义资产研发

资产是构建图应用的基本单元。如果官方提供的资无法满足业务需求，可以自定义资产。

资产分为组件（widget）和服务（service）两类。

### 资产研发流程

#### 组件资产开发

以下是一个简单的组件资产开发示例：

```plaintext
├─widgets
│ ├─Toolbar
│ │ ├─index.tsx         // 组件资产的入口文件
│ │ ├─Component.tsx     // 组件文件
│ │ ├─Component.less    // 组件样式文件，非必须
│ ├─index.ts            // 资产包的入口文件
```

组件资产 Toolbar 的入口文件：

```jsx
import React from 'react';
import type { ImplementWidget } from '@antv/gi-sdk';

export const Toolbar: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'Toolbar',
    displayName: '工具栏',
  },
  component: () => {
    return <div>Toolbar</div>
  },
};
```

#### 服务资产开发

服务资产用于定义数据获取模块。以下是一个简单的服务资产开发示例：

```plaintext
├─services
│ ├─fetch-data
│ │ ├─index.ts // 服务资产的入口文件
│ │ ├─service.ts // 服务文件
```

服务资产 FetchData 的入口文件：

```jsx
import type { ImplementService } from '@antv/gi-sdk';

export const FetchData: ImplementService = {
  version: '0.1',
  metadata: {
    name: 'FetchData',
    description: '通过 fetch 获取数据',
  },
  service: ({ properties: { url } }) => {
    return fetch(url).then((res) => res.json());
  },
};
```

#### 资产打包

官方提供核心资产包 `@antv/gi-core-assets`，可直接使用。自定义资产包示例：

```jsx
import type { AssetPackage } from '@antv/gi-sdk';
import { Toolbar } from './widgets';
import { FetchData } from './services';

export const MyAssetPackage: AssetPackage = {
  version: '0.1',
  metadata: {
    name: 'MyAssetPackage',
    displayName: '测试用资产包',
  },
  widgets: [ Toolbar, ... ],
  services: [ FetchData, ... ],
};
```

### Hooks

GISDK 提供以下 Hooks，方便在**开发资产时**使用。

### 画布相关

- `useGraph()`：获取和更新图实例。

  ```jsx
  import { useGraph } from '@antv/gi-sdk';

  export default () => {
    const [graphInstance, setGraphInstance] = useGraph();
  };
  ```

- `useGraphOptions()`：获取和更新图配置项。

  ```jsx
  import { useGraphOptions } from '@antv/gi-sdk';

  export default () => {
    const [options, updateOptions] = useGraphOptions();
  };
  ```

### 组件间通信

- `useGlobalModel(key?)`：管理全局扩展状态，允许在不同组件间共享状态。

  ```jsx
  import { useGlobalModel } from '@antv/gi-sdk';

  export default () => {
    const [globalModel, setGlobalModel] = useGlobalModel();
    const [a, setA] = useGlobalModel('a');
  };
  ```

- `useEventSubscribe(evt, callback, once?)`：订阅事件，监听特定事件触发回调。

  ```jsx
  import { useEventSubscribe } from '@antv/gi-sdk';

  export default () => {
    useEventSubscribe('update', () => {...});
  };
  ```

- `useEventPublish()`：发布事件，通知其他组件。

  ```jsx
  import { useEventPublish } from '@antv/gi-sdk';

  export default () => {
    const emit = useEventPublish();

    const triggerChange = () => {
      emit('update');
    };
  };
  ```

- `useWidgetProps(widgetId)`：获取和更新组件属性。

  ```jsx
  import { useWidgetProps } from '@antv/gi-sdk';

  export default () => {
    const [panelProps, updatePanelProps] = useWidgetProps('panel');
  };
  ```

### 注册机制

- `useRegistryManager()`：管理组件和服务的动态注册。

  ```jsx
  import { useRegistryManager } from '@antv/gi-sdk';

  export default () => {
    const registryManager = useRegistryManager();
    const fetchDataService = registryManager.getService('FetchData').service;
  };
  ```
