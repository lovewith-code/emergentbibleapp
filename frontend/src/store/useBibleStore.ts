import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontSizeKey } from '../constants/theme';

interface BibleState {
  currentBookId: number;
  currentChapter: number;
  currentVerse: number;
  fontSize: FontSizeKey;
  lineSpacing: 'normal' | 'relaxed';

  setPosition: (bookId: number, chapter: number, verse?: number) => void;
  setFontSize: (size: FontSizeKey) => void;
  setLineSpacing: (spacing: 'normal' | 'relaxed') => void;
}

export const useBibleStore = create<BibleState>()(  persist(
    (set) => ({
      currentBookId: 1,
      currentChapter: 1,
      currentVerse: 1,
      fontSize: 'md',
      lineSpacing: 'normal',

      setPosition: (bookId, chapter, verse = 1) =>
        set({ currentBookId: bookId, currentChapter: chapter, currentVerse: verse }),
      setFontSize: (size) => set({ fontSize: size }),
      setLineSpacing: (spacing) => set({ lineSpacing: spacing }),
    }),
    {
      name: '@bible_state',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);