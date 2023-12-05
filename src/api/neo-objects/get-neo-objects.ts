import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { client } from '../client';

import { neoObjectsFactory } from './neo-objects-factory';
import type { NeoObjectReponseData } from './types';

const apiKey = '9TBtGd0cKSPsorZgQkfI5QI2HExTG8qWIX1NuzhC';

export const getAllNeoObjects = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const response = await client.get<NeoObjectReponseData>(
    `/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`,
  );

  return response.data;
};

export const useGetAllNeoObjects = (
  date: {
    startDate: string;
    endDate: string;
  },
  options?: UseQueryOptions<
    NeoObjectReponseData,
    AxiosError,
    NeoObjectReponseData,
    readonly [string]
  >,
) => {
  return useQuery({
    queryFn: () => getAllNeoObjects(date),
    queryKey: [...neoObjectsFactory.neoObjects],
    ...options,
  });
};
