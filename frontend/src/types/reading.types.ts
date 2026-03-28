export interface Bookmark {
  id:        string;
  bookId:    number;
  chapter:   number;
  verse:     number;
  createdAt: string;
  note:      string;
}

export interface Favorite {
  id:        string;
  bookId:    number;
  chapter:   number;
  verse:     number;
  createdAt: string;
}

export interface Highlight {
  id:        string;
  bookId:    number;
  chapter:   number;
  verse:     number;
  color:     'yellow' | 'blue' | 'green' | 'pink';
  createdAt: string;
}

export interface ReadingHistory {
  bookId:    number;
  chapter:   number;
  verse:     number;
  visitedAt: string;
}