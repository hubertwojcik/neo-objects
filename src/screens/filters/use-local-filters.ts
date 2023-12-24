import type { NearEarthObject, NEOFilterSettings } from '@/shared/types';
import { extractActiveNEOFilters } from '@/shared/utils';
import { useEffect, useMemo, useState } from 'react';

export const useLocalFilters = (
  initialFilters: NEOFilterSettings,
  neoObjects: NearEarthObject[],
) => {
  const [localFilters, setLocalFilters] = useState(initialFilters);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const filteredLocalFilters = useMemo(
    () => extractActiveNEOFilters(localFilters, neoObjects),
    [localFilters, neoObjects],
  );

  return { localFilters, setLocalFilters, filteredLocalFilters };
};
