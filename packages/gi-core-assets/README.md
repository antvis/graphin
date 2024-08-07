# `@antv/gi-core-assets`

This package provides core assets essential for building graph applications and is intended to be paired with the `@antv/gi-sdk` package, which provides an SDK for rendering graph insight applications.

## Installation

```bash
$ npm install @antv/gi-core-assets
# or
$ yarn add @antv/gi-core-assets
```

## Usage

```js
import React from 'react';
import GICoreAssets from '@antv/gi-core-assets';
import { GISDK } from '@antv/gi-sdk';
import { config } from './config';

export const Demo: React.FC = () => {
  const assets = [GICoreAssets];

  return <GISDK config={config} assets={assets} />;
};
```
