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

// Oznacza to, że przyjmuje typ T, który jest podtypem NEOFilter
// Zwracana funkcja przyjmuje argument value typu T['value']. To oznacza, że bierze wartość z typu T i zakłada, że ma pole value danego typu.
export const createFilterFunction =
  <T extends NEOFilter>() =>
  (value: T['value']) => ({ value });

export const createTextFilter = createFilterFunction<TextFilter>();

export const createRangeFilter = createFilterFunction<RangeFilter>();

export const createBooleanFilter = createFilterFunction<BooleanFilter>();

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

export const createNEOFilterSettings = (
  filterCriteria: Record<NEOFilterKey, NEOFilterValue>,
): NEOFilterSettings => {
  return mapNEOFilters(filterCriteria, createFilterByType);
};

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

export const getFilterValue = <K extends NEOFilterKey>(
  name: K,
  neoFilters: NEOFilterSettings,
) => neoFilters[name]?.value as NEOFilterCriteriaMap[K] | undefined;

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isActiveFilter = ([_, val]: NEOFilterPair): boolean => {
  if (val === undefined) return false;
  const value = val.value;
  if (isString(value)) return !!value.trim();
  else if (isNumber(value)) return !!value;
  else if (isBoolean(value)) return value;
  return false;
};
