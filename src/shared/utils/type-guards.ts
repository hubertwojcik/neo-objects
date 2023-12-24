import type { AnyObject } from '../types/utils';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = (value: unknown): value is Array<any> =>
  Array.isArray(value);

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export function isObject(value: unknown): value is AnyObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
