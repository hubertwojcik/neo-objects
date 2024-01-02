import { mapNeoObjectDetails } from '@/shared/utils/map-neo-object-details';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getNeoObjectById } from './get-neo-object-by-id';

import { neoObjectsFactory } from './neo-objects-factory';

export const useGetNeoObjectById = (id: string) => {
  const qrClient = useQueryClient();

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryFn: () =>
      getNeoObjectById({
        id,
      }),
    queryKey: [...neoObjectsFactory.neoObjectById(id), { id }],
  });

  useEffect(() => {
    qrClient.invalidateQueries({
      queryKey: [...neoObjectsFactory.neoObjects, { id }],
    });
  }, [id]);

  const mappedData = data === undefined ? undefined : mapNeoObjectDetails(data);

  return {
    data: mappedData,
    isFetching,
    isLoading,
    isError,
    error,
  };
};
