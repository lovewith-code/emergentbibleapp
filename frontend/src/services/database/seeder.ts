import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, Result } from './index';
import { logger } from '@/utils/logger';
import { DB_SEED_CHUNK_SIZE } from '@/constants/config';

interface BibleVerse {
  Verseid: string;
  Verse: string;
}

interface BibleChapter {
  Verse: BibleVerse[];
}

interface BibleBook {
  Chapter: BibleChapter[];
}

interface BibleData {
  Book: BibleBook[];
}

const SEED_KEY = '@db_seeded_v1';

export const isDbSeeded = async (): Promise<boolean> => {
  try {
    const seeded = await AsyncStorage.getItem(SEED_KEY);
    return seeded === 'true';
  } catch {
    return false;
  }
};

export const seedDatabase = async (
  teluguData: BibleData,
  englishData: BibleData,
  onProgress?: (percent: number, message: string) => void
): Promise<Result<boolean>> => {
  try {
    const db = await getDatabase();
    
    // Check if already seeded
    const seeded = await isDbSeeded();
    if (seeded) {
      logger.info('Seeder', 'Database already seeded');
      return { data: true, error: null };
    }
    
    logger.info('Seeder', 'Starting database seeding...');
    onProgress?.(0, 'Preparing Bible data...');
    
    // Parse and merge data
    const verses: Array<{
      bookId: number;
      chapter: number;
      verse: number;
      textTel: string;
      textEng: string;
    }> = [];
    
    // Process Telugu data
    teluguData.Book.forEach((book, bookIndex) => {
      book.Chapter.forEach((chapter, chapterIndex) => {
        chapter.Verse.forEach((verse, verseIndex) => {
          verses.push({
            bookId: bookIndex + 1,
            chapter: chapterIndex + 1,
            verse: verseIndex + 1,
            textTel: verse.Verse,
            textEng: '', // Will be filled from English data
          });
        });
      });
    });
    
    logger.info('Seeder', `Parsed ${verses.length} verses from Telugu`);
    
    // Merge English data
    let mergedCount = 0;
    englishData.Book.forEach((book, bookIndex) => {
      book.Chapter.forEach((chapter, chapterIndex) => {
        chapter.Verse.forEach((verse, verseIndex) => {
          const existing = verses.find(
            v => v.bookId === bookIndex + 1 && 
                 v.chapter === chapterIndex + 1 && 
                 v.verse === verseIndex + 1
          );
          if (existing) {
            existing.textEng = verse.Verse;
            mergedCount++;
          }
        });
      });
    });
    
    logger.info('Seeder', `Merged ${mergedCount} English verses`);
    onProgress?.(10, 'Data prepared. Inserting into database...');
    
    // Insert in chunks
    const totalVerses = verses.length;
    let inserted = 0;
    
    for (let i = 0; i < verses.length; i += DB_SEED_CHUNK_SIZE) {
      const chunk = verses.slice(i, i + DB_SEED_CHUNK_SIZE);
      
      await db.withTransactionAsync(async () => {
        for (const v of chunk) {
          await db.runAsync(
            'INSERT OR REPLACE INTO verses (book_id, chapter, verse_num, text_tel, text_eng) VALUES (?, ?, ?, ?, ?)',
            [v.bookId, v.chapter, v.verse, v.textTel, v.textEng]
          );
        }
      });
      
      inserted += chunk.length;
      const percent = Math.floor((inserted / totalVerses) * 90) + 10;
      onProgress?.(percent, `Inserted ${inserted} / ${totalVerses} verses...`);
      logger.debug('Seeder', `Inserted chunk: ${inserted} / ${totalVerses}`);
    }
    
    // Mark as seeded
    await AsyncStorage.setItem(SEED_KEY, 'true');
    onProgress?.(100, 'Database seeding complete!');
    logger.info('Seeder', 'Database seeding completed successfully');
    
    return { data: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error during seeding';
    logger.error('Seeder', 'Failed to seed database', { error });
    return { data: null, error: message };
  }
};