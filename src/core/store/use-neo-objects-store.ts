import type { NearEarthObject, NEOFilterSettings } from '@/shared/types';
import { create } from 'zustand';

type NeoObjectsState = {
  neoObjects?: NearEarthObject[];
  setNeoObjects: (objects: NearEarthObject[]) => void;
  filters: NEOFilterSettings;
  setFilters: (filters: NEOFilterSettings) => void;
};

export const useNeoObjectsStore = create<NeoObjectsState>((set) => ({
  neoObjects: undefined,
  setNeoObjects: (objects?: NearEarthObject[]) => set({ neoObjects: objects }),
  filters: {},
  setFilters: (filters) => set((state) => ({ ...state, filters })),
}));
