import { client } from '../client';

import Env from '@env';
import type { NeoObjectDetailsResponse } from '@/shared/types';

export const getNeoObjectById = async ({ id }: { id: string }) => {
  const response = await client.get<NeoObjectDetailsResponse>(
    `/neo/${id}?api_key=${Env.NASA_API_KEY}`,
  );

  return response.data;
};
