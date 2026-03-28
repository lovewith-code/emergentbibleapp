import { create } from 'zustand';
import { Bookmark, Favorite, Highlight, ReadingHistory } from '@/types/reading.types';
import * as BookmarksQuery from '@/services/database/bookmarks.queries';
import * as FavoritesQuery from '@/services/database/favorites.queries';
import * as HighlightsQuery from '@/services/database/highlights.queries';
import * as HistoryQuery from '@/services/database/history.queries';
import { logger } from '@/utils/logger';

interface ReadingState {
  bookmarks: Bookmark[];
  favorites: Favorite[];
  highlights: Highlight[];
  history: ReadingHistory[];

  loadAll: () => Promise<void>;
  
  // Bookmarks
  addBookmark: (bookId: number, chapter: number, verse: number, note?: string) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  isBookmarked: (bookId: number, chapter: number, verse: number) => boolean;
  
  // Favorites
  toggleFavorite: (bookId: number, chapter: number, verse: number) => Promise<void>;
  isFavorited: (bookId: number, chapter: number, verse: number) => boolean;
  
  // Highlights
  setHighlight: (bookId: number, chapter: number, verse: number, color: Highlight['color']) => Promise<void>;
  removeHighlight: (id: string) => Promise<void>;
  getHighlightColor: (bookId: number, chapter: number, verse: number) => Highlight['color'] | null;
  
  // History
  recordVisit: (bookId: number, chapter: number, verse?: number) => Promise<void>;
  getLastVisit: () => ReadingHistory | null;
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  bookmarks: [],
  favorites: [],
  highlights: [],
  history: [],

  loadAll: async () => {
    const [bookmarksRes, favoritesRes, highlightsRes] = await Promise.all([
      BookmarksQuery.getAllBookmarks(),
      FavoritesQuery.getAllFavorites(),
      HighlightsQuery.getAllHighlights(),
    ]);

    set({
      bookmarks: bookmarksRes.data || [],
      favorites: favoritesRes.data || [],
      highlights: highlightsRes.data || [],
    });
    logger.info('ReadingStore', 'Loaded all reading data');
  },

  addBookmark: async (bookId, chapter, verse, note = '') => {
    const result = await BookmarksQuery.addBookmark(bookId, chapter, verse, note);
    if (result.data) {
      set((state) => ({ bookmarks: [result.data!, ...state.bookmarks] }));
    }
  },

  removeBookmark: async (id) => {
    await BookmarksQuery.removeBookmark(id);
    set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.id !== id) }));
  },

  isBookmarked: (bookId, chapter, verse) => {
    return get().bookmarks.some(
      (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse
    );
  },

  toggleFavorite: async (bookId, chapter, verse) => {
    const existing = get().favorites.find(
      (f) => f.bookId === bookId && f.chapter === chapter && f.verse === verse
    );

    if (existing) {
      await FavoritesQuery.removeFavorite(existing.id);
      set((state) => ({ favorites: state.favorites.filter((f) => f.id !== existing.id) }));
    } else {
      const result = await FavoritesQuery.addFavorite(bookId, chapter, verse);
      if (result.data) {
        set((state) => ({ favorites: [result.data!, ...state.favorites] }));
      }
    }
  },

  isFavorited: (bookId, chapter, verse) => {
    return get().favorites.some(
      (f) => f.bookId === bookId && f.chapter === chapter && f.verse === verse
    );
  },

  setHighlight: async (bookId, chapter, verse, color) => {
    const result = await HighlightsQuery.setHighlight(bookId, chapter, verse, color);
    if (result.data) {
      // Remove existing highlight for this verse
      set((state) => ({
        highlights: [
          result.data!,
          ...state.highlights.filter(
            (h) => !(h.bookId === bookId && h.chapter === chapter && h.verse === verse)
          ),
        ],
      }));
    }
  },

  removeHighlight: async (id) => {
    await HighlightsQuery.removeHighlight(id);
    set((state) => ({ highlights: state.highlights.filter((h) => h.id !== id) }));
  },

  getHighlightColor: (bookId, chapter, verse) => {
    const highlight = get().highlights.find(
      (h) => h.bookId === bookId && h.chapter === chapter && h.verse === verse
    );
    return highlight?.color || null;
  },

  recordVisit: async (bookId, chapter, verse = 1) => {
    await HistoryQuery.recordVisit(bookId, chapter, verse);
    const result = await HistoryQuery.getLastVisit();
    if (result.data) {
      set((state) => ({ history: [result.data!, ...state.history.slice(0, 9)] }));
    }
  },

  getLastVisit: () => {
    const history = get().history;
    return history.length > 0 ? history[0] : null;
  },
}));