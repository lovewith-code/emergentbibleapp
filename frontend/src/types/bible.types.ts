export type BookCategory = 'law' | 'history' | 'poetry' | 'prophecy' | 'gospel' | 'epistle' | 'apocalypse';
export type Testament = 'old' | 'new';
export type Language = 'english' | 'telugu' | 'both';

export interface BibleBook {
  id:          number;
  nameEnglish: string;
  nameTelugu:  string;
  shortCode:   string;
  testament:   Testament;
  category:    BookCategory;
  chapters:    number;
}

export interface Verse {
  id:       number;
  bookId:   number;
  chapter:  number;
  verse:    number;
  textEng:  string;
  textTel:  string;
}

export interface BiblePosition {
  bookId:  number;
  chapter: number;
  verse:   number;
}

export interface DailyVerse {
  bookId:      number;
  chapter:     number;
  verse:       number;
  textEnglish: string;
  textTelugu:  string;
  reference:   string;
}