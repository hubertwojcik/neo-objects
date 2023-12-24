import { useNeoObjectsStore } from '@/core/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAllNeoObjects } from './get-neo-objects';
import { neoObjectsFactory } from './neo-objects-factory';

export const useGetNeoObjects = (date: string) => {
  const neoObjects = useNeoObjectsStore((state) => state.neoObjects);

  const setNeoObjects = useNeoObjectsStore((state) => state.setNeoObjects);

  const qrClient = useQueryClient();

  const { data, isFetching, isLoading } = useQuery({
    queryFn: () =>
      getAllNeoObjects({
        startDate: date,
        endDate: date,
      }),
    queryKey: [...neoObjectsFactory.neoObjects, { date }],
  });

  useEffect(() => {
    if (data) {
      setNeoObjects(data.near_earth_objects[date]);
    }
  }, [data, setNeoObjects]);

  useEffect(() => {
    qrClient.invalidateQueries({
      queryKey: [...neoObjectsFactory.neoObjects, { date }],
    });
  }, [date]);

  return {
    neoObjects,
    isFetching,
    isLoading,
  };
};
