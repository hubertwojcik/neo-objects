import type {
  NearEarthObject,
  NumberRange,
  NumericFilterKey,
} from '@/shared/types';
import {
  findMaxValueByKeyInNearEarthObjects,
  findMinValueByKeyInNearEarthObjects,
} from '@/shared/utils';
import { useMemo } from 'react';

export const useRangeMinMaxValues = (
  neoObjects: NearEarthObject[],
  key: NumericFilterKey,
) => {
  const minValue = useMemo(
    () => Math.floor(findMinValueByKeyInNearEarthObjects(neoObjects, key) ?? 0),
    [neoObjects, key],
  );

  const maxValue = useMemo(
    () => Math.ceil(findMaxValueByKeyInNearEarthObjects(neoObjects, key) ?? 0),
    [neoObjects, key],
  );

  const initialRangeFilter: NumberRange = useMemo(
    () => [Math.floor(minValue), Math.ceil(maxValue)],
    [minValue, maxValue],
  );

  return {
    minValue,
    maxValue,
    initialRangeFilter,
  };
};
