import { getDatabase, Result } from './index';
import { Verse } from '@/../types/bible.types';
import { logger } from '@/../utils/logger';
import { SEARCH_MIN_CHARS } from '@/../constants/config';

export const getVersesByChapter = async (
  bookId: number,
  chapter: number
): Promise<Result<Verse[]>> => {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync<{
      id: number;
      book_id: number;
      chapter: number;
      verse_num: number;
      text_eng: string;
      text_tel: string;
    }>(
      'SELECT * FROM verses WHERE book_id = ? AND chapter = ? ORDER BY verse_num ASC',
      [bookId, chapter]
    );

    const verses: Verse[] = result.map(row => ({
      id: row.id || 0,
      bookId: row.book_id,
      chapter: row.chapter,
      verse: row.verse_num,
      textEng: row.text_eng,
      textTel: row.text_tel,
    }));

    logger.debug('VersesQuery', `Fetched ${verses.length} verses for book ${bookId}, chapter ${chapter}`);
    return { data: verses, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch verses';
    logger.error('VersesQuery', 'Error fetching verses', { error, bookId, chapter });
    return { data: null, error: message };
  }
};

export const searchVerses = async (
  query: string,
  lang: 'english' | 'telugu' | 'both'
): Promise<Result<Verse[]>> => {
  try {
    if (query.length < SEARCH_MIN_CHARS) {
      return { data: [], error: null };
    }

    const db = await getDatabase();
    const searchTerm = `%${query}%`;
    let sql = '';
    let params: string[] = [];

    if (lang === 'both') {
      sql = 'SELECT * FROM verses WHERE text_eng LIKE ? OR text_tel LIKE ? LIMIT 50';
      params = [searchTerm, searchTerm];
    } else if (lang === 'english') {
      sql = 'SELECT * FROM verses WHERE text_eng LIKE ? LIMIT 50';
      params = [searchTerm];
    } else {
      sql = 'SELECT * FROM verses WHERE text_tel LIKE ? LIMIT 50';
      params = [searchTerm];
    }

    const result = await db.getAllAsync<{
      id: number;
      book_id: number;
      chapter: number;
      verse_num: number;
      text_eng: string;
      text_tel: string;
    }>(sql, params);

    const verses: Verse[] = result.map(row => ({
      id: row.id || 0,
      bookId: row.book_id,
      chapter: row.chapter,
      verse: row.verse_num,
      textEng: row.text_eng,
      textTel: row.text_tel,
    }));

    logger.debug('VersesQuery', `Search found ${verses.length} results for: ${query}`);
    return { data: verses, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    logger.error('VersesQuery', 'Error searching verses', { error, query });
    return { data: null, error: message };
  }
};

export const getVerse = async (
  bookId: number,
  chapter: number,
  verse: number
): Promise<Result<Verse | null>> => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync<{
      id: number;
      book_id: number;
      chapter: number;
      verse_num: number;
      text_eng: string;
      text_tel: string;
    }>(
      'SELECT * FROM verses WHERE book_id = ? AND chapter = ? AND verse_num = ?',
      [bookId, chapter, verse]
    );

    if (!result) {
      return { data: null, error: null };
    }

    const verseData: Verse = {
      id: result.id || 0,
      bookId: result.book_id,
      chapter: result.chapter,
      verse: result.verse_num,
      textEng: result.text_eng,
      textTel: result.text_tel,
    };

    return { data: verseData, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch verse';
    logger.error('VersesQuery', 'Error fetching verse', { error, bookId, chapter, verse });
    return { data: null, error: message };
  }
};

export const getVerseCount = async (
  bookId: number,
  chapter: number
): Promise<Result<number>> => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM verses WHERE book_id = ? AND chapter = ?',
      [bookId, chapter]
    );

    return { data: result?.count || 0, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to count verses';
    logger.error('VersesQuery', 'Error counting verses', { error, bookId, chapter });
    return { data: null, error: message };
  }
};