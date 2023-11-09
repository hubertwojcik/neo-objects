import { create } from 'zustand';

interface AuthState {
  authenticationStatus: 'signOut' | 'signIn';
  signIn: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authenticationStatus: 'signOut',
  token: null,
  signIn: () => {
    set({ authenticationStatus: 'signIn' });
  },
  signOut: () => {
    set({ authenticationStatus: 'signOut' });
  },
}));
