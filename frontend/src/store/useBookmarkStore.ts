import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Bookmark {
  id: string;
  bookId: number;
  chapter: number;
  verse: number;
  textTel: string;
  textEng: string;
  createdAt: number;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (bookId: number, chapter: number, verse: number) => boolean;
  getBookmarkId: (bookId: number, chapter: number, verse: number) => string | null;
  clearAll: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (bookmark) => {
        const id = `${bookmark.bookId}-${bookmark.chapter}-${bookmark.verse}`;
        const existing = get().bookmarks.find((b) => b.id === id);
        if (!existing) {
          set((state) => ({
            bookmarks: [
              { ...bookmark, id, createdAt: Date.now() },
              ...state.bookmarks,
            ],
          }));
        }
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },

      isBookmarked: (bookId, chapter, verse) => {
        const id = `${bookId}-${chapter}-${verse}`;
        return get().bookmarks.some((b) => b.id === id);
      },

      getBookmarkId: (bookId, chapter, verse) => {
        const id = `${bookId}-${chapter}-${verse}`;
        const found = get().bookmarks.find((b) => b.id === id);
        return found ? found.id : null;
      },

      clearAll: () => set({ bookmarks: [] }),
    }),
    {
      name: '@bookmarks_state',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
