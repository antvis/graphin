<h1 align="center">GISDK</h1>

<div align="center">SDK for creating graph insight applications</div>

## ✨ 功能特性

- **简单易用**：通过简单配置即可快速搭建图可视化应用，并支持本地调试。
- **高度扩展**：内置丰富的图资产、并支持自定义资产，满足不同业务需求。
- **灵活组合**：通过插槽机制实现组件的灵活组合和动态渲染。

## 🔨 快速使用

将 `GISDK` 作为一个普通的 React 组件使用，通过 NPM 或 Yarn 安装。

```bash
$ npm install @antv/gi-sdk
```

```bash
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

### 1. 资产研发（可选）

在构建图应用之前，需要开发自定义资产。资产分为组件（widget）和服务（service）两类。

#### 组件资产开发

组件资产是构建图应用的基本单元。以下是一个简单的组件资产开发示例：

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

### 2. 配置图应用

配置图应用是 GISDK 使用过程中的重要环节。通过详细配置，可以定义图应用的版本号、元数据信息、数据集配置、图画布配置和组件配置，确保图应用满足具体业务需求。

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

支持两种形态：本地数据集以及远程数据集。远程数据集需要配合服务资产使用，最后获取到的数据会自动绑定到图上。

```js
dataset: {
  id: 'dataset-id',
  type: 'remote',
  serviceType: 'FetchData',
  properties: {
    url: 'https://assets.antv.antgroup.com/g6/cluster.json',
  },
}
```

#### 2.2 图画布配置

图画布的配置请参考 [G6 配置](https://g6.antv.antgroup.com/) 文档。

#### 2.3 组件配置

通过组件配置指定图应用中使用的所有组件，并通过 slot 机制管理组件间的父子关系，进行灵活布局。

##### Slot 机制

Slot 是用来将组件插入特定位置的插槽，通过 slot，可以灵活地组织组件的布局。

1. **定义 slots**

   为容器组件定义多个 slot，例如 toolbar。这个 slot 就像一个预留的插槽，等待具体的组件插入。

   ```json
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

   ```json
   {
     "widgets": [
       {
         "id": "toolbar",
         "type": "Toolbar",
         "slots": {
           "default": ["zoom-in", "zoom-out"]
         }
       },
       {
         "id": "zoom-in",
         "type": "ZoomInButton"
       },
       {
         "id": "zoom-out",
         "type": "ZoomOutButton"
       }
     ]
   }
   ```

3. **父组件中的具体实现**

   在父组件中，使用 `slotElements` 属性将子组件插入到相应的 slot 中。

   ```jsx
   export default (props) => {
     const { slotElements } = props;

     return <div className="toolbar">{slotElements.default}</div>;
   };
   ```

### 3. 渲染图应用

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

> 完整的图应用示例代码见 [DEMO](https://github.com/antvis/Graphin/tree/v3/packages/gi-core-assets/docs)

## 🪝 Hooks

GISDK 提供以下 Hooks，方便在开发资产时使用。

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

## 国际化方案

TODO：待建设
