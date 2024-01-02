/**
 * A generic higher-order function type that maps each value of an input object to a new value,
 * producing an object with the same keys but transformed values.
 *
 * @typeParam T - The type of the values in the input object.
 * @typeParam U - The type of the values in the output object.
 *
 * @param obj - An object of type `Record<string, T>`, where each property's value is of type `T`.
 * @param fn - A function of type `(value: T) => U` that transforms each value of the input object from type `T` to type `U`.
 *
 * @returns A new object of type `Record<string, U>` with the same keys as the input object but with each value transformed by the provided function.
 *
 * @example
 * ```
 * // Example usage of MapValuesFunction
 *
 * // A function to convert a number to a string
 * const numberToString = (value: number): string => value.toString();
 *
 * // An object with number values
 * const numericObject: Record<string, number> = {
 *   a: 1,
 *   b: 2,
 *   c: 3
 * };
 *
 * // A function implementing MapValuesFunction
 * const mapValues: MapValuesFunction = (obj, fn) => {
 *   const result: Record<string, any> = {};
 *   for (const key in obj) {
 *     if (obj.hasOwnProperty(key)) {
 *       result[key] = fn(obj[key]);
 *     }
 *   }
 *   return result;
 * };
 *
 * // Transform numericObject using mapValues and numberToString
 * const stringObject = mapValues(numericObject, numberToString);
 * console.log(stringObject); // Output: { a: '1', b: '2', c: '3' }
 * ```
 */

export type MapValuesFunction = <T, U>(
  obj: Record<string, T>,
  fn: (value: T) => U,
) => Record<string, U>;

/**
 * Picks properties from a given type based on their values' type.
 *
 * @typeParam T - The input type.
 * @typeParam U - The type to filter properties by.
 *
 * @example
 * ```typescript
 * type InputType = {
 *   name: string;
 *   age: number;
 *   isActive: boolean;
 * };
 *
 * type StringType = PickByType<InputType, string>; // { name: string }
 * type NumberType = PickByType<InputType, number>; // { age: number }
 * type BooleanType = PickByType<InputType, boolean>; // { isActive: boolean }
 * ```
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = { [key: string]: any };

export type Point = { x: number; y: number };

export type Nullabe<T> = T | null;
