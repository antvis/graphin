import React from 'react';
import type { Slot, WidgetItem } from '../types';
import { getWidget } from '../assets';
import { BuiltInWidgets } from '../assets/widgets';

export const useComponent = (widgets: WidgetItem[]) => {
  const allWidgets = [...BuiltInWidgets, ...widgets];

  const renderComponents = (slot: Slot) => {
    const slotWidgets = allWidgets.filter(item => item.slot === slot);

    return slotWidgets.map((item, index) => {
      const { name, properties } = item;
      const Component = getWidget(name);

      if (!Component) return null;

      return <Component key={`${name}-${index}`} {...properties} />;
    });
  };

  return { renderComponents };
};
