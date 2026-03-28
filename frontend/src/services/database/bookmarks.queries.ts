import { getDatabase, Result } from './index';
import { Bookmark } from '@/../types/reading.types';
import { generateId } from '@/../utils/idGenerator';
import { logger } from '@/../utils/logger';

export const getAllBookmarks = async (): Promise<Result<Bookmark[]>> => {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      book_id: number;
      chapter: number;
      verse_num: number;
      note: string;
      created_at: string;
    }>('SELECT * FROM bookmarks ORDER BY created_at DESC');

    const bookmarks: Bookmark[] = result.map(row => ({
      id: row.id,
      bookId: row.book_id,
      chapter: row.chapter,
      verse: row.verse_num,
      note: row.note,
      createdAt: row.created_at,
    }));

    return { data: bookmarks, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch bookmarks';
    logger.error('BookmarksQuery', 'Error fetching bookmarks', { error });
    return { data: null, error: message };
  }
};

export const addBookmark = async (
  bookId: number,
  chapter: number,
  verse: number,
  note: string = ''
): Promise<Result<Bookmark>> => {
  try {
    const db = await getDatabase();
    const id = generateId();
    const createdAt = new Date().toISOString();

    await db.runAsync(
      'INSERT INTO bookmarks (id, book_id, chapter, verse_num, note, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [id, bookId, chapter, verse, note, createdAt]
    );

    const bookmark: Bookmark = { id, bookId, chapter, verse, note, createdAt };
    logger.info('BookmarksQuery', 'Bookmark added', { bookId, chapter, verse });
    return { data: bookmark, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add bookmark';
    logger.error('BookmarksQuery', 'Error adding bookmark', { error });
    return { data: null, error: message };
  }
};

export const removeBookmark = async (id: string): Promise<Result<boolean>> => {
  try {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM bookmarks WHERE id = ?', [id]);
    logger.info('BookmarksQuery', 'Bookmark removed', { id });
    return { data: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove bookmark';
    logger.error('BookmarksQuery', 'Error removing bookmark', { error, id });
    return { data: null, error: message };
  }
};

export const isBookmarked = async (
  bookId: number,
  chapter: number,
  verse: number
): Promise<Result<boolean>> => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM bookmarks WHERE book_id = ? AND chapter = ? AND verse_num = ?',
      [bookId, chapter, verse]
    );
    return { data: (result?.count || 0) > 0, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to check bookmark';
    logger.error('BookmarksQuery', 'Error checking bookmark', { error });
    return { data: null, error: message };
  }
};