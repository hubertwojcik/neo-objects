import { create } from 'zustand';

type AppStore = {
  isWelcomed: boolean;
  setIsWelcomed: (isWelcomed: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isWelcomed: false,
  setIsWelcomed: (isWelcomed) => set({ isWelcomed }),
}));
