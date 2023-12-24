import type { AnyObject } from '../types/utils';
import { isObject } from './type-guards';

/**
 * Deeply compares two objects to determine if they are equivalent.
 *
 * This function recursively compares all properties of two objects. It handles nested objects and arrays.
 * Primitive values (string, number, boolean) are compared directly. Objects are compared by recursively
 * applying deep equality to their properties. Arrays are compared element-wise with deep equality checks.
 *
 * Note: This function does not handle function comparison and does not compare object prototypes.
 *
 * @param a - The first object to compare.
 * @param b - The second object to compare.
 * @returns `true` if both objects are deeply equal, otherwise `false`.
 *
 * @example
 * ```
 * const obj1 = { name: "Eros", details: { type: "Asteroid", discovered: 1898 } };
 * const obj2 = { name: "Eros", details: { type: "Asteroid", discovered: 1898 } };
 * console.log(deepEqual(obj1, obj2)); // Output: true
 * ```
 *
 * @remarks
 * - The function uses an `isObject` type guard to check if a value is an actual object (and not an array or null).
 * - For arrays, the function compares each element using deep equality checks.
 * - This function is not suitable for comparing objects with circular references.
 */
export function deepEqual(a: AnyObject, b: AnyObject): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }

    const valA = a[key];
    const valB = b[key];

    if (isObject(valA) && isObject(valB)) {
      if (!deepEqual(valA, valB)) {
        return false;
      }
    } else if (Array.isArray(valA) && Array.isArray(valB)) {
      if (!deepEqual(valA, valB)) {
        return false;
      }
    } else if (valA !== valB) {
      return false;
    }
  }

  return true;
}
