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

// Parse Verseid to extract bookId, chapter, verse
// Format: "BBCCCVVV" where BB=book, CCC=chapter, VVV=verse
const parseVerseId = (verseid: string) => {
  const bookId = parseInt(verseid.substring(0, 2), 10);
  const chapter = parseInt(verseid.substring(2, 5), 10);
  const verse = parseInt(verseid.substring(5, 8), 10);
  return { bookId, chapter, verse };
};

// Parse JSON structure to get verses
const parseVerses = () => {
  try {
    const verses: Verse[] = [];
    let id = 1;

    // Process each book in Telugu Bible
    teluguBible.Book.forEach((book: any, bookIndex: number) => {
      book.Chapter.forEach((chapter: any, chapterIndex: number) => {
        chapter.Verse.forEach((verse: any, verseIndex: number) => {
          // Get the corresponding English verse
          const engVerse =
            englishBible.Book[bookIndex]?.Chapter[chapterIndex]?.Verse[verseIndex];

          // Parse the Verseid to get correct book/chapter/verse numbers
          const parsed = parseVerseId(verse.Verseid);

          verses.push({
            id: id++,
            bookId: parsed.bookId,
            chapter: parsed.chapter,
            verse: parsed.verse,
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
      (v) => v.bookId === bookId && v.chapter === chapter
    );
    return { data: verses, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch verses';
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

    const results = allVerses
      .filter((verse) => {
        if (lang === 'english') {
          return verse.textEng.toLowerCase().includes(searchTerm);
        } else if (lang === 'telugu') {
          return verse.textTel.toLowerCase().includes(searchTerm);
        } else {
          return (
            verse.textEng.toLowerCase().includes(searchTerm) ||
            verse.textTel.toLowerCase().includes(searchTerm)
          );
        }
      })
      .slice(0, 50); // Limit to 50 results

    return { data: results, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Search failed';
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
      (v) => v.bookId === bookId && v.chapter === chapter && v.verse === verse
    );
    return { data: found || null, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch verse';
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
      (v) => v.bookId === bookId && v.chapter === chapter
    ).length;
    return { data: count, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to count verses';
    return { data: null, error: message };
  }
};

// Get list of available books (those with actual data)
export const getAvailableBooks = (): number[] => {
  const allVerses = getAllVerses();
  const bookIds = new Set(allVerses.map((v) => v.bookId));
  return Array.from(bookIds).sort((a, b) => a - b);
};

// Get available chapters for a book
export const getAvailableChapters = (bookId: number): number[] => {
  const allVerses = getAllVerses();
  const chapters = new Set(
    allVerses.filter((v) => v.bookId === bookId).map((v) => v.chapter)
  );
  return Array.from(chapters).sort((a, b) => a - b);
};
