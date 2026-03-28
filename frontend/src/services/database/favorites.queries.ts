import { getDatabase, Result } from './index';
import { Favorite } from '@/../types/reading.types';
import { generateId } from '@/../utils/idGenerator';
import { logger } from '@/../utils/logger';

export const getAllFavorites = async (): Promise<Result<Favorite[]>> => {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      book_id: number;
      chapter: number;
      verse_num: number;
      created_at: string;
    }>('SELECT * FROM favorites ORDER BY created_at DESC');

    const favorites: Favorite[] = result.map(row => ({
      id: row.id,
      bookId: row.book_id,
      chapter: row.chapter,
      verse: row.verse_num,
      createdAt: row.created_at,
    }));

    return { data: favorites, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch favorites';
    logger.error('FavoritesQuery', 'Error fetching favorites', { error });
    return { data: null, error: message };
  }
};

export const addFavorite = async (
  bookId: number,
  chapter: number,
  verse: number
): Promise<Result<Favorite>> => {
  try {
    const db = await getDatabase();
    const id = generateId();
    const createdAt = new Date().toISOString();

    await db.runAsync(
      'INSERT INTO favorites (id, book_id, chapter, verse_num, created_at) VALUES (?, ?, ?, ?, ?)',
      [id, bookId, chapter, verse, createdAt]
    );

    const favorite: Favorite = { id, bookId, chapter, verse, createdAt };
    logger.info('FavoritesQuery', 'Favorite added', { bookId, chapter, verse });
    return { data: favorite, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add favorite';
    logger.error('FavoritesQuery', 'Error adding favorite', { error });
    return { data: null, error: message };
  }
};

export const removeFavorite = async (id: string): Promise<Result<boolean>> => {
  try {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM favorites WHERE id = ?', [id]);
    logger.info('FavoritesQuery', 'Favorite removed', { id });
    return { data: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove favorite';
    logger.error('FavoritesQuery', 'Error removing favorite', { error, id });
    return { data: null, error: message };
  }
};