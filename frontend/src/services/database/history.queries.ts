import { getDatabase, Result } from './index';
import { ReadingHistory } from '../../types/reading.types';
import { logger } from '../../utils/logger';
import { HISTORY_MAX_RECORDS } from '../../constants/config';

export const recordVisit = async (
  bookId: number,
  chapter: number,
  verse: number = 1
): Promise<Result<boolean>> => {
  try {
    const db = await getDatabase();
    const visitedAt = new Date().toISOString();

    await db.runAsync(
      'INSERT INTO reading_history (book_id, chapter, verse_num, visited_at) VALUES (?, ?, ?, ?)',
      [bookId, chapter, verse, visitedAt]
    );

    // Keep only recent records
    await db.runAsync(
      `DELETE FROM reading_history WHERE id NOT IN (
        SELECT id FROM reading_history ORDER BY visited_at DESC LIMIT ?
      )`,
      [HISTORY_MAX_RECORDS]
    );

    logger.debug('HistoryQuery', 'Visit recorded', { bookId, chapter, verse });
    return { data: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to record visit';
    logger.error('HistoryQuery', 'Error recording visit', { error });
    return { data: null, error: message };
  }
};

export const getLastVisit = async (): Promise<Result<ReadingHistory | null>> => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync<{
      book_id: number;
      chapter: number;
      verse_num: number;
      visited_at: string;
    }>('SELECT * FROM reading_history ORDER BY visited_at DESC LIMIT 1');

    if (!result) {
      return { data: null, error: null };
    }

    const history: ReadingHistory = {
      bookId: result.book_id,
      chapter: result.chapter,
      verse: result.verse_num,
      visitedAt: result.visited_at,
    };

    return { data: history, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get last visit';
    logger.error('HistoryQuery', 'Error getting last visit', { error });
    return { data: null, error: message };
  }
};