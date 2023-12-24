import type { NEOFilterSettings, NearEarthObject } from '@/shared/types';
import { filterNeoObjects } from '@/shared/utils';
import { useMemo } from 'react';

/**
 * A custom React hook that memoizes the result of filtering Near Earth Objects (NEOs)
 * based on provided filter settings. This hook ensures that the filtering operation
 * is only re-computed when `neoObjects` or `filters` change.
 *
 * @param neoObjects - An array of NearEarthObjects to be filtered.
 * @param filters - The filter settings (NEOFilterSettings) to apply.
 * @returns A memoized array of NearEarthObjects that match the provided filter settings.
 *
 * @example
 * ```
 * const neoObjects = [{ name: 'Eros', ... }, { name: 'Apollo', ... }];
 * const filters = { name: { value: 'Eros' } };
 *
 * // Use the hook in a React component
 * const filteredObjects = useFilterNeoObjects(neoObjects, filters);
 * // filteredObjects will be an array of NEOs where the 'name' matches 'Eros',
 * // and it will be recomputed only if neoObjects or filters change.
 * ```
 */
export const useFilterNeoObjects = (
  neoObjects: NearEarthObject[],
  filters: NEOFilterSettings,
) =>
  useMemo(() => {
    return filterNeoObjects(neoObjects, filters);
  }, [neoObjects, filters]);
