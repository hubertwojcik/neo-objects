import type {
  BooleanFilter,
  NEOFilterKey,
  NEOFilterSettings,
  NEOFilterPair,
  NEOFilterCriteriaMap,
  NEOFilter,
  NEOFilterValue,
  NearEarthObject,
  RangeFilter,
  TextFilter,
  NumericFilterKey,
} from '../types';
import type { MapValuesFunction } from '../types/utils';

import { isArray, isBoolean, isNumber, isString } from './type-guards';

/**
 * Example of creating a filter function for TextFilter.
 *
 * @returns A TextFilter object with the provided value.
 *
 * @example
 * ```
 * const textFilter = createFilterFunction<TextFilter>()('Eros');
 * // Returns: { value: 'Eros' }
 * ```
 */
export const createFilterFunction =
  <T extends NEOFilter>() =>
  (value: T['value']) => ({ value });

/**
 * Example of creating a specific type of filter.
 *
 * @returns A filter object of the respective type with the provided value.
 *
 * @example
 * ```
 * const textFilter = createTextFilter('Eros');
 * // Returns: { value: 'Eros' }
 *
 * const rangeFilter = createRangeFilter([5.0, 10.0]);
 * // Returns: { value: [5.0, 10.0] }
 *
 * const booleanFilter = createBooleanFilter(true);
 * // Returns: { value: true }
 * ```
 */
export const createTextFilter = createFilterFunction<TextFilter>();
export const createRangeFilter = createFilterFunction<RangeFilter>();
export const createBooleanFilter = createFilterFunction<BooleanFilter>();

/**
 * Example of creating a filter object based on the type of the provided value.
 *
 * @returns A filter object corresponding to the type of the value.
 *
 * @example
 * ```
 * const filter = createFilterByType('Eros');
 * // Returns: { value: 'Eros' } (TextFilter)
 *
 * const filter = createFilterByType([5.0, 10.0]);
 * // Returns: { value: [5.0, 10.0] } (RangeFilter)
 *
 * const filter = createFilterByType(true);
 * // Returns: { value: true } (BooleanFilter)
 * ```
 */
export const createFilterByType = (value: NEOFilterValue) => {
  if (value === undefined) return;
  if (isString(value)) {
    return createTextFilter(value);
  } else if (isBoolean(value)) {
    return createBooleanFilter(value);
  } else {
    return createRangeFilter(value);
  }
};

/**
 * Transforms each value in the provided filter criteria object using the specified transformation function.
 *
 * @param filterCriteria - The object containing filter criteria.
 * @param applyFilterTransformation - The function to apply to each filter value.
 * @returns A new object with transformed filter values.
 *
 * @example
 * ```
 * const transformedFilters = mapNEOFilters({ name: 'Eros' }, createFilterByType);
 * // Returns: { name: { value: 'Eros' } } // TextFilter for 'name'
 * ```
 */
export const mapNEOFilters: MapValuesFunction = (
  filterCriteria,
  applyFilterTransformation,
) => {
  return Object.keys(filterCriteria).reduce(
    (transformedFilters, filterKey) => {
      const transformedValue = applyFilterTransformation(
        filterCriteria[filterKey],
      );

      if (transformedValue !== undefined) {
        transformedFilters[filterKey] = transformedValue;
      }
      return transformedFilters;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as Record<string, any>,
  );
};

/**
 * Creates NEO filter settings based on the provided filter criteria.
 *
 * @param filterCriteria - An object mapping filter keys to their respective values.
 * @returns An object of NEOFilterSettings with the filters transformed by type.
 *
 * @example
 * ```
 * const filterSettings = createNEOFilterSettings({ name: 'Eros', absolute_magnitude_h: [5.0, 10.0] });
 * // Returns: { name: { value: 'Eros' }, absolute_magnitude_h: { value: [5.0, 10.0] } }
 * ```
 */
export const createNEOFilterSettings = (
  filterCriteria: Record<NEOFilterKey, NEOFilterValue>,
): NEOFilterSettings => {
  return mapNEOFilters(filterCriteria, createFilterByType);
};

/**
 * Filters an array of NearEarthObjects based on the provided filter settings.
 *
 * @param objects - The array of NearEarthObjects to filter.
 * @param filters - The filter settings to apply.
 * @returns An array of NearEarthObjects that match the filter settings.
 *
 * @example
 * ```
 * const filteredObjects = filterNeoObjects(neoArray, { name: { value: 'Eros' } });
 * // Returns: Array of NearEarthObjects where the 'name' matches 'Eros'
 * ```
 */
export const filterNeoObjects = (
  objects: NearEarthObject[],
  filters: NEOFilterSettings,
) => {
  const isObjectMatchingFilters = (obj: NearEarthObject): boolean => {
    for (const [filterKey, filterValue] of Object.entries(filters)) {
      if (!isFilterMatch(obj, filterKey as NEOFilterKey, filterValue)) {
        return false;
      }
    }
    return true;
  };

  return objects.filter(isObjectMatchingFilters);
};

const isFilterMatch = (
  obj: NearEarthObject,
  filterKey: NEOFilterKey,
  filterValue: NEOFilter,
): boolean => {
  const value = obj[filterKey];

  if (value === undefined) return false;

  if (isString(value) && isString(filterValue.value)) {
    return (value as string)
      .toLocaleLowerCase()
      .includes((filterValue.value as string).toLowerCase());
  } else if (isNumber(value) && isArray(filterValue.value)) {
    const [min, max] = filterValue.value as [number, number];
    return value >= min && value <= max;
  } else if (isBoolean(value) && isBoolean(filterValue.value)) {
    return value === filterValue.value;
  }

  return false;
};

/**
 * Retrieves the filter value for a given filter key from NEO filter settings.
 *
 * @typeparam K - A subtype of NEOFilterKey.
 * @param name - The filter key.
 * @param neoFilters - The NEO filter settings.
 * @returns The filter value corresponding to the key or undefined if not present.
 *
 * @example
 * ```
 * const value = getFilterValue('name', { name: { value: 'Eros' } });
 * // Returns: 'Eros'
 * ```
 */
export const getFilterValue = <K extends NEOFilterKey>(
  name: K,
  neoFilters: NEOFilterSettings,
) => {
  return neoFilters[name]?.value as NEOFilterCriteriaMap[K] | undefined;
};

/**
 * Extracts only the active filters from a set of NEO filter settings.
 *
 * @param filters - The NEO filter settings to extract from.
 * @returns An object of NEOFilterSettings containing only the active filters.
 *
 * @example
 * ```
 * const activeFilters = extractActiveNEOFilters({ name: { value: 'Eros' }, is_potentially_hazardous_asteroid: { value: true } });
 * // Returns: { name: { value: 'Eros' }, is_potentially_hazardous_asteroid: { value: true } }
 * ```
 */
export const extractActiveNEOFilters = (
  filters: NEOFilterSettings,
  neoObjects: NearEarthObject[],
): NEOFilterSettings => {
  const activeFilters: NEOFilterSettings = {};

  for (const [key, filter] of Object.entries(filters)) {
    if (isActiveFilter([key as NEOFilterKey, filter], neoObjects)) {
      activeFilters[key as NEOFilterKey] = filter;
    }
  }

  return activeFilters;
};

/**
 * Checks if a NEO filter is active based on its value.
 *
 * @param param0 - A NEOFilterPair, which is a tuple of the filter key and its corresponding filter object.
 * @returns `true` if the filter is active, otherwise `false`.
 *
 * @example
 * ```
 * const filterPair: NEOFilterPair = ["name", { value: "Eros" }];
 * const active = isActiveFilter(filterPair); // Returns true if the filter value is non-empty.
 * ```
 */
const isActiveFilter = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [key, val]: NEOFilterPair,
  neoObjects: NearEarthObject[],
): boolean => {
  if (val === undefined) return false;
  const value = val.value;
  if (isString(value)) return !!value.trim();
  else if (isNumber(value)) return !!value;
  else if (isBoolean(value)) return true;
  else if (isArray(value)) {
    if (key === 'absolute_magnitude_h') {
      const [min, max] = value;
      return !(
        min ===
          (findMinValueByKeyInNearEarthObjects(
            neoObjects,
            'absolute_magnitude_h',
          ) ?? 0) &&
        (max ===
          findMaxValueByKeyInNearEarthObjects(
            neoObjects,
            'absolute_magnitude_h',
          ) ??
          0)
      );
    }
  }
  return false;
};

function findMinItem<T>(
  array: T[],
  getValueFunction: (item: T) => number,
): T | null {
  if (array.length === 0) {
    // Handle the case of an empty array
    return null;
  }

  let minValue = getValueFunction(array[0]);
  let minItem = array[0];

  for (let i = 1; i < array.length; i++) {
    const currentValue = getValueFunction(array[i]);
    if (currentValue < minValue) {
      minValue = currentValue;
      minItem = array[i];
    }
  }

  return minItem;
}

function findMaxItem<T>(
  array: T[],
  getValueFunction: (item: T) => number,
): T | null {
  if (array.length === 0) {
    // Handle the case of an empty array
    return null;
  }

  let maxValue = getValueFunction(array[0]);
  let maxItem = array[0];

  for (let i = 1; i < array.length; i++) {
    const currentValue = getValueFunction(array[i]);
    if (currentValue > maxValue) {
      maxValue = currentValue;
      maxItem = array[i];
    }
  }

  return maxItem;
}

/**
 * Finds the minimum value for a specified key in a list of Near Earth Objects.
 *
 * @param {NearEarthObject[]} neoObjects - The list of Near Earth Objects to search.
 * @param {NumericFilterKey} key - The key to determine the values for comparison.
 * @returns {number | null} - The minimum value found, or null if the list is empty.
 */
export const findMinValueByKeyInNearEarthObjects = (
  neoObjects: NearEarthObject[],
  key: NumericFilterKey,
) => findMinItem(neoObjects, (neo) => neo[key])?.[key];

/**
 * Finds the maximum value for a specified key in a list of Near Earth Objects.
 *
 * @param {NearEarthObject[]} neoObjects - The list of Near Earth Objects to search.
 * @param {NumericFilterKey} key - The key to determine the values for comparison.
 * @returns {number | null} - The maximum value found, or null if the list is empty.
 */
export const findMaxValueByKeyInNearEarthObjects = (
  neoObjects: NearEarthObject[],
  key: NumericFilterKey,
) => findMaxItem(neoObjects, (neo) => neo[key])?.[key];

/**
 * Determines if two `NEOFilter` values are equal.
 *
 * This function compares two `NEOFilter` objects by checking if they are of the same type
 * and if their `value` properties are equal when converted to strings. This is useful for
 * comparing filters that might have different types of values (like strings, numbers, or booleans).
 *
 * @param firstFilter - The first `NEOFilter` object to compare.
 * @param secondFilter - The second `NEOFilter` object to compare.
 * @returns `true` if the types and string representations of `value` are the same for both filters, otherwise `false`.
 *
 * @example
 * ```
 * const filter1: TextFilter = { value: "Eros" };
 * const filter2: TextFilter = { value: "Eros" };
 * const isEqual = areFilterValuesEqual(filter1, filter2); // Returns true
 * ```
 */

export const areFilterValuesEqual = (
  firstFilter: NEOFilter,
  secondFilter: NEOFilter,
) =>
  typeof firstFilter === typeof secondFilter &&
  `${firstFilter.value}` === `${secondFilter.value}`;

/**
 * Checks if two `NEOFilterSettings` objects are equal.
 *
 * This function compares two `NEOFilterSettings` objects by converting them into sorted arrays of entries
 * (`NEOFilterPair[]`) and then checking if every corresponding `NEOFilter` value is equal using `areFilterValuesEqual`.
 * The comparison takes into account both the filter key and value. It ensures that two filter settings are considered
 * equal only if they have the same set of filters with equal values.
 *
 * @param firstFilter - The first `NEOFilterSettings` object to compare.
 * @param secondFilter - The second `NEOFilterSettings` object to compare.
 * @returns `true` if both `NEOFilterSettings` objects contain the same filters with equal values, otherwise `false`.
 *
 * @example
 * ```
 * const settings1: NEOFilterSettings = { name: { value: "Eros" } };
 * const settings2: NEOFilterSettings = { name: { value: "Eros" } };
 * const isEqual = areSelectedFiltersTheSame(settings1, settings2); // Returns true
 * ```
 */
export const areSelectedFiltersTheSame = (
  firstFilter: NEOFilterSettings,
  secondFilter: NEOFilterSettings,
) => {
  const firstFilterEntries = Object.entries(
    firstFilter,
  ).sort() as NEOFilterPair[];
  const secondFilterEntries = Object.entries(
    secondFilter,
  ).sort() as NEOFilterPair[];

  if (firstFilterEntries.length !== secondFilterEntries.length) return false;

  return firstFilterEntries.every(([key, val], index) => {
    const [secondKey, secondVal] = secondFilterEntries[index];
    return key === secondKey && areFilterValuesEqual(val, secondVal);
  });
};
