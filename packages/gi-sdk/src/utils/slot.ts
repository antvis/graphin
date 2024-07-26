import type { ID, Slot } from '../types';

/**
 * 解析插槽配置
 * @param slot 插槽配置
 * @returns 标准化插槽配置
 */
export function parseSlot(slot?: Slot): Record<string, ID[]> {
  if (!slot) return { default: [] };
  return Array.isArray(slot) ? { default: slot } : slot;
}
