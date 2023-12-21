import type { NearEarthObject } from './neo';
import type { PickByType } from './utils';

/**
 * Represents a mapping of keys to their respective filter types for Near Earth Objects.
 *
 * @example
 * ```
 * const criteriaMap: NEOFilterCriteriaMap = {
 *   name: 'string',
 *   absolute_magnitude_h: [5.0, 10.0],
 *   is_potentially_hazardous_asteroid: true
 * };
 * ```
 */
export type NEOFilterCriteriaMap = {
  /** Filters by the name of the NEO. */
  name: string;
  /** Filters by the absolute magnitude of the NEO. Expects a `NumberRange` type. */
  absolute_magnitude_h: NumberRange;
  /** Filters based on whether the NEO is potentially hazardous. Optional. */
  is_potentially_hazardous_asteroid?: boolean;
};

/**
 * A type used to extract keys from `NearEarthObject` that are filterable based on `NEOFilterCriteriaMap`.
 *
 * @example
 * ```
 * type NEOKey: NEOFilterKey = 'name' | 'absolute_magnitude_h';
 * ```
 */
export type NEOFilterKey = keyof Pick<
  NearEarthObject,
  keyof NEOFilterCriteriaMap
>;

/**
 * Represents the keys from `NearEarthObject` that are filterable with numeric criteria.
 *
 * This type is created by extracting keys from `NearEarthObject` based on the criteria defined in `NEOFilterCriteriaMap`.
 * It includes only those keys whose values are of type `number`.
 *
 * @example
 * ```typescript
 * type NumericFilterKey = 'absolute_magnitude_h';
 * ```
 *
 * @remarks
 * This type is used in the context of filtering Near-Earth Objects (NEOs) based on numeric criteria,
 * as defined in the `NEOFilterCriteriaMap`.
 *
 * @see {@link NearEarthObject}
 * @see {@link NEOFilterCriteriaMap}
 * @see {@link NEOFilterKey}
 */
export type NumericFilterKey = keyof PickByType<
  Pick<NearEarthObject, NEOFilterKey>,
  number
>;

/**
 * Represents the possible values for NEO filters derived from `NEOFilterCriteriaMap`.
 *
 * @example
 * ```
 * let filterValue: NEOFilterValue = 'string'; // or [number, number], or boolean
 * ```
 */
export type NEOFilterValue = NEOFilterCriteriaMap[keyof NEOFilterCriteriaMap];

/**
 * Defines a filter option with a value of type `T`.
 *
 * @example
 * ```
 * const textFilterOption: FilterOption<string> = { value: "Apollo" };
 * ```
 */
export type FilterOption<T extends NEOFilterValue> = { value: T };

/**
 * Represents a numeric range, typically used for magnitude filters.
 *
 * @example
 * ```
 * const magnitudeRange: NumberRange = [5.0, 10.0];
 * ```
 */
export type NumberRange = [number, number];

/**
 * Filter option for text values.
 *
 * @example
 * ```
 * const textFilter: TextFilter = { value: "Eros" };
 * ```
 */
export type TextFilter = FilterOption<string>;

/**
 * Filter option for boolean values.
 *
 * @example
 * ```
 * const booleanFilter: BooleanFilter = { value: true };
 * ```
 */
export type BooleanFilter = FilterOption<boolean>;

/**
 * Filter option for numeric range values.
 *
 * @example
 * ```
 * const rangeFilter: RangeFilter = { value: [5.0, 10.0] };
 * ```
 */
export type RangeFilter = FilterOption<NumberRange>;

/**
 * Union type representing any of the filter types applicable to NEOs.
 *
 * @example
 * ```
 * let neoFilter: NEOFilter = textFilter; // Can be any of TextFilter, RangeFilter, BooleanFilter
 * ```
 */
export type NEOFilter = TextFilter | RangeFilter | BooleanFilter;

/**
 * Record type with keys as `NEOFilterKey` and values as `NEOFilter`. Makes the values optional.
 *
 * @example
 * ```
 * // Define filters for NEOs
 * const nameFilter: TextFilter = { value: "Eros" };
 * const hazardFilter: BooleanFilter = { value: true };
 *
 * // Create filter settings using these filters
 * const filterSettings: NEOFilterSettings = {
 *   name: nameFilter,
 *   is_potentially_hazardous_asteroid: hazardFilter
 * };
 * ```
 */
export type NEOFilterSettings = Partial<Record<NEOFilterKey, NEOFilter>>;

/**
 * A tuple type where the first element is a key from `NEOFilterKey` and the second is a value of type `NEOFilter`.
 *
 * @example
 * ```
 * // Define a range filter for the absolute magnitude
 * const magnitudeRangeFilter: RangeFilter = { value: [5.0, 10.0] };
 *
 * // Create a filter pair for the absolute magnitude
 * const filterPair: NEOFilterPair = ['absolute_magnitude_h', magnitudeRangeFilter];
 * ```
 */
export type NEOFilterPair = [NEOFilterKey, NEOFilter];
