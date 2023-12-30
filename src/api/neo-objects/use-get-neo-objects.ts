import { useNeoObjectsStore } from '@/core/store';
import { mapNeoObjects } from '@/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAllNeoObjects } from './get-neo-objects';
import { neoObjectsFactory } from './neo-objects-factory';

export const useGetNeoObjects = (date: string) => {
  const neoObjects = useNeoObjectsStore((state) => state.neoObjects);

  const setNeoObjects = useNeoObjectsStore((state) => state.setNeoObjects);
  const setFilters = useNeoObjectsStore((state) => state.setFilters);

  const qrClient = useQueryClient();

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryFn: () =>
      getAllNeoObjects({
        startDate: date,
        endDate: date,
      }),
    queryKey: [...neoObjectsFactory.neoObjects, { date }],
  });

  useEffect(() => {
    if (data) {
      const mappedObjects = mapNeoObjects(data.near_earth_objects[date]);
      setNeoObjects(mappedObjects);
    }
  }, [data, setNeoObjects]);

  useEffect(() => {
    setFilters({});
    qrClient.invalidateQueries({
      queryKey: [...neoObjectsFactory.neoObjects, { date }],
    });
  }, [date]);

  return {
    neoObjects,
    isFetching,
    isLoading,
    isError,
    error,
  };
};
