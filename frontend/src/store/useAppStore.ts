import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user.types';
import { Language } from '@/types/bible.types';

interface AppState {
  // User state
  user: User | null;
  isGuest: boolean;
  isOnboarded: boolean;
  preferredLanguage: Language;
  
  // DB state
  isDbReady: boolean;
  seedingProgress: number;
  
  // Actions
  setUser: (user: User | null) => void;
  continueAsGuest: () => void;
  setOnboarded: () => void;
  setLanguage: (lang: Language) => void;
  setDbReady: (ready: boolean) => void;
  setSeedingProgress: (pct: number) => void;
  signOut: () => void;
}

export const useAppStore = create<AppState>()(  persist(
    (set) => ({
      user: null,
      isGuest: false,
      isOnboarded: false,
      preferredLanguage: 'both',
      isDbReady: false,
      seedingProgress: 0,

      setUser: (user) => set({ user, isGuest: false }),
      continueAsGuest: () => set({ isGuest: true, user: null }),
      setOnboarded: () => set({ isOnboarded: true }),
      setLanguage: (lang) => set({ preferredLanguage: lang }),
      setDbReady: (ready) => set({ isDbReady: ready }),
      setSeedingProgress: (pct) => set({ seedingProgress: pct }),
      signOut: () => set({ user: null, isGuest: false }),
    }),
    {
      name: '@app_state',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isOnboarded: state.isOnboarded,
        preferredLanguage: state.preferredLanguage,
        isGuest: state.isGuest,
      }),
    }
  )
);