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
      transformedFilters[filterKey] = applyFilterTransformation(
        filterCriteria[filterKey],
      );
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
) => neoFilters[name]?.value as NEOFilterCriteriaMap[K] | undefined;

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
): NEOFilterSettings => {
  const activeFilters: NEOFilterSettings = {};

  for (const [key, filter] of Object.entries(filters)) {
    if (isActiveFilter([key as NEOFilterKey, filter])) {
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isActiveFilter = ([_, val]: NEOFilterPair): boolean => {
  if (val === undefined) return false;
  const value = val.value;
  if (isString(value)) return !!value.trim();
  else if (isNumber(value)) return !!value;
  else if (isBoolean(value)) return value;
  return false;
};
