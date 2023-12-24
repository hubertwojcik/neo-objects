import type { NearEarthObject, NumberRange } from '@/shared/types';
import {
  findMaxValueByKeyInNearEarthObjects,
  findMinValueByKeyInNearEarthObjects,
} from '@/shared/utils';
import { useMemo } from 'react';

export const useMagnitudeRangeMinMaxValues = (
  neoObjects: NearEarthObject[],
) => {
  const minMagnitude = useMemo(
    () =>
      findMinValueByKeyInNearEarthObjects(neoObjects, 'absolute_magnitude_h') ??
      0,
    [neoObjects],
  );

  const maxMagnitude = useMemo(
    () =>
      findMaxValueByKeyInNearEarthObjects(neoObjects, 'absolute_magnitude_h') ??
      0,
    [neoObjects],
  );

  const initialMagnitudeFilter: NumberRange = useMemo(
    () => [Math.floor(minMagnitude), Math.ceil(maxMagnitude)],
    [minMagnitude, maxMagnitude],
  );

  return {
    minMagnitude: Math.ceil(minMagnitude),
    maxMagnitude: Math.ceil(maxMagnitude),
    initialMagnitudeFilter,
  };
};
