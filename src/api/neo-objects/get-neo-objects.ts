import { client } from '../client';

import type { NeoObjectReponseData } from '@/shared/types';
import Env from '@env';

export const getAllNeoObjects = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const response = await client.get<NeoObjectReponseData>(
    `/feed?start_date=${startDate}&end_date=${endDate}&api_key=${Env.NASA_API_KEY}`,
  );

  return response.data;
};
