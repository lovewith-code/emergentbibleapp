// Service to read Bible data directly from JSON files
import { Verse } from '@/types/bible.types';

// Import JSON files
let teluguBible: any;
let englishBible: any;

try {
  teluguBible = require('../../assets/data/sample_bible_tel.json');
  englishBible = require('../../assets/data/sample_bible_eng.json');
} catch (error) {
  console.error('Error loading Bible JSON files:', error);
  teluguBible = { Book: [] };
  englishBible = { Book: [] };
}

export type Result<T> = 
  | { data: T; error: null }
  | { data: null; error: string };

// Parse JSON structure to get verses
const parseVerses = () => {
  try {
    const verses: Verse[] = [];
    let verseId = 1;

    // Process each book
    teluguBible.Book.forEach((book, bookIndex) => {
      // Process each chapter
      book.Chapter.forEach((chapter, chapterIndex) => {
        // Process each verse
        chapter.Verse.forEach((verse, verseIndex) => {
          // Get corresponding English verse
          const engVerse = englishBible.Book[bookIndex]?.Chapter[chapterIndex]?.Verse[verseIndex];
          
          verses.push({
            id: verseId++,
            bookId: bookIndex + 1,
            chapter: chapterIndex + 1,
            verse: verseIndex + 1,
            textTel: verse.Verse,
            textEng: engVerse?.Verse || '',
          });
        });
      });
    });

    return verses;
  } catch (error) {
    console.error('Error parsing Bible JSON:', error);
    return [];
  }
};

// Cache parsed verses in memory
let cachedVerses: Verse[] | null = null;

const getAllVerses = (): Verse[] => {
  if (!cachedVerses) {
    cachedVerses = parseVerses();
  }
  return cachedVerses;
};

// Get verses by chapter
export const getVersesByChapter = (
  bookId: number,
  chapter: number
): Result<Verse[]> => {
  try {
    const allVerses = getAllVerses();
    const verses = allVerses.filter(
      v => v.bookId === bookId && v.chapter === chapter
    );
    return { data: verses, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch verses';
    return { data: null, error: message };
  }
};

// Search verses
export const searchVerses = (
  query: string,
  lang: 'english' | 'telugu' | 'both'
): Result<Verse[]> => {
  try {
    if (query.length < 3) {
      return { data: [], error: null };
    }

    const allVerses = getAllVerses();
    const searchTerm = query.toLowerCase();
    
    const results = allVerses.filter(verse => {
      if (lang === 'english') {
        return verse.textEng.toLowerCase().includes(searchTerm);
      } else if (lang === 'telugu') {
        return verse.textTel.toLowerCase().includes(searchTerm);
      } else {
        return verse.textEng.toLowerCase().includes(searchTerm) ||
               verse.textTel.toLowerCase().includes(searchTerm);
      }
    }).slice(0, 50); // Limit to 50 results

    return { data: results, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    return { data: null, error: message };
  }
};

// Get single verse
export const getVerse = (
  bookId: number,
  chapter: number,
  verse: number
): Result<Verse | null> => {
  try {
    const allVerses = getAllVerses();
    const found = allVerses.find(
      v => v.bookId === bookId && v.chapter === chapter && v.verse === verse
    );
    return { data: found || null, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch verse';
    return { data: null, error: message };
  }
};

// Get verse count for a chapter
export const getVerseCount = (
  bookId: number,
  chapter: number
): Result<number> => {
  try {
    const allVerses = getAllVerses();
    const count = allVerses.filter(
      v => v.bookId === bookId && v.chapter === chapter
    ).length;
    return { data: count, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to count verses';
    return { data: null, error: message };
  }
};
