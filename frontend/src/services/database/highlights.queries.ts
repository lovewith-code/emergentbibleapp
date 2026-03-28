import { getDatabase, Result } from './index';
import { Highlight } from '../../types/reading.types';
import { generateId } from '../../utils/idGenerator';
import { logger } from '../../utils/logger';

export const getAllHighlights = async (): Promise<Result<Highlight[]>> => {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync<{
      id: string;
      book_id: number;
      chapter: number;
      verse_num: number;
      color: 'yellow' | 'blue' | 'green' | 'pink';
      created_at: string;
    }>('SELECT * FROM highlights ORDER BY created_at DESC');

    const highlights: Highlight[] = result.map(row => ({
      id: row.id,
      bookId: row.book_id,
      chapter: row.chapter,
      verse: row.verse_num,
      color: row.color,
      createdAt: row.created_at,
    }));

    return { data: highlights, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch highlights';
    logger.error('HighlightsQuery', 'Error fetching highlights', { error });
    return { data: null, error: message };
  }
};

export const setHighlight = async (
  bookId: number,
  chapter: number,
  verse: number,
  color: 'yellow' | 'blue' | 'green' | 'pink'
): Promise<Result<Highlight>> => {
  try {
    const db = await getDatabase();
    
    // Remove existing highlight first
    await db.runAsync(
      'DELETE FROM highlights WHERE book_id = ? AND chapter = ? AND verse_num = ?',
      [bookId, chapter, verse]
    );
    
    const id = generateId();
    const createdAt = new Date().toISOString();

    await db.runAsync(
      'INSERT INTO highlights (id, book_id, chapter, verse_num, color, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [id, bookId, chapter, verse, color, createdAt]
    );

    const highlight: Highlight = { id, bookId, chapter, verse, color, createdAt };
    logger.info('HighlightsQuery', 'Highlight set', { bookId, chapter, verse, color });
    return { data: highlight, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to set highlight';
    logger.error('HighlightsQuery', 'Error setting highlight', { error });
    return { data: null, error: message };
  }
};

export const removeHighlight = async (id: string): Promise<Result<boolean>> => {
  try {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM highlights WHERE id = ?', [id]);
    logger.info('HighlightsQuery', 'Highlight removed', { id });
    return { data: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove highlight';
    logger.error('HighlightsQuery', 'Error removing highlight', { error, id });
    return { data: null, error: message };
  }
};