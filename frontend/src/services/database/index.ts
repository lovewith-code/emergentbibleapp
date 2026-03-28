import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '@/utils/logger';

export type Result<T> = 
  | { data: T; error: null }
  | { data: null; error: string };

let db: SQLite.SQLiteDatabase | null = null;

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;
  
  try {
    db = await SQLite.openDatabaseAsync('HolyBook.db');
    logger.info('Database', 'Database connection established');
    return db;
  } catch (error) {
    logger.error('Database', 'Failed to open database', { error });
    throw error;
  }
};

export const isDbSeeded = async (): Promise<boolean> => {
  try {
    const seeded = await AsyncStorage.getItem('@db_seeded_v1');
    return seeded === 'true';
  } catch {
    return false;
  }
};

export const initDatabase = async (): Promise<Result<boolean>> => {
  try {
    const database = await getDatabase();
    
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS verses (
        id        INTEGER PRIMARY KEY,
        book_id   INTEGER NOT NULL,
        chapter   INTEGER NOT NULL,
        verse_num INTEGER NOT NULL,
        text_eng  TEXT NOT NULL,
        text_tel  TEXT NOT NULL
      );
      
      CREATE UNIQUE INDEX IF NOT EXISTS idx_verses ON verses(book_id, chapter, verse_num);
      CREATE INDEX IF NOT EXISTS idx_search_eng ON verses(text_eng);
      CREATE INDEX IF NOT EXISTS idx_search_tel ON verses(text_tel);
      
      CREATE TABLE IF NOT EXISTS bookmarks (
        id         TEXT PRIMARY KEY,
        book_id    INTEGER NOT NULL,
        chapter    INTEGER NOT NULL,
        verse_num  INTEGER NOT NULL,
        note       TEXT DEFAULT '',
        created_at TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS favorites (
        id         TEXT PRIMARY KEY,
        book_id    INTEGER NOT NULL,
        chapter    INTEGER NOT NULL,
        verse_num  INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS highlights (
        id         TEXT PRIMARY KEY,
        book_id    INTEGER NOT NULL,
        chapter    INTEGER NOT NULL,
        verse_num  INTEGER NOT NULL,
        color      TEXT NOT NULL CHECK(color IN ('yellow','blue','green','pink')),
        created_at TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS reading_history (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id    INTEGER NOT NULL,
        chapter    INTEGER NOT NULL,
        verse_num  INTEGER DEFAULT 1,
        visited_at TEXT NOT NULL
      );
    `);
    
    logger.info('Database', 'All tables created successfully');
    return { data: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Database', 'Failed to initialize database', { error });
    return { data: null, error: message };
  }
};