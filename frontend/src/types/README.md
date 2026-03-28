# src/types - TypeScript Type Definitions

All TypeScript interfaces and types for the HolyBook app.

## 📄 Files

### bible.types.ts
**Purpose**: Bible domain types

**Types**:

1. **BookCategory**
```typescript
type BookCategory = 'law' | 'history' | 'poetry' | 
  'prophecy' | 'gospel' | 'epistle' | 'apocalypse';
```

2. **Testament**
```typescript
type Testament = 'old' | 'new';
```

3. **Language**
```typescript
type Language = 'english' | 'telugu' | 'both';
```

4. **BibleBook**
```typescript
interface BibleBook {
  id: number;           // 1-66
  nameEnglish: string;  // "Genesis"
  nameTelugu: string;   // "ఆదికాండము"
  shortCode: string;    // "GEN"
  testament: Testament; // 'old' | 'new'
  category: BookCategory;
  chapters: number;     // Total chapters
}
```

5. **Verse**
```typescript
interface Verse {
  id: number;
  bookId: number;       // 1-66
  chapter: number;
  verse: number;
  textEng: string;      // English text
  textTel: string;      // Telugu text
}
```

6. **BiblePosition**
```typescript
interface BiblePosition {
  bookId: number;
  chapter: number;
  verse: number;
}
```

7. **DailyVerse**
```typescript
interface DailyVerse {
  bookId: number;
  chapter: number;
  verse: number;
  textEnglish: string;
  textTelugu: string;
  reference: string;    // "Genesis 1:1"
}
```

---

### user.types.ts
**Purpose**: User and authentication types

**Types**:

1. **User**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null;
}
```

2. **AuthState**
```typescript
interface AuthState {
  user: User | null;
  isGuest: boolean;
  idToken: string | null;  // JWT token
}
```

---

### reading.types.ts
**Purpose**: User reading data types

**Types**:

1. **Bookmark**
```typescript
interface Bookmark {
  id: string;          // UUID
  bookId: number;
  chapter: number;
  verse: number;
  createdAt: string;   // ISO 8601
  note: string;        // Optional note
}
```

2. **Favorite**
```typescript
interface Favorite {
  id: string;
  bookId: number;
  chapter: number;
  verse: number;
  createdAt: string;
}
```

3. **Highlight**
```typescript
interface Highlight {
  id: string;
  bookId: number;
  chapter: number;
  verse: number;
  color: 'yellow' | 'blue' | 'green' | 'pink';
  createdAt: string;
}
```

4. **ReadingHistory**
```typescript
interface ReadingHistory {
  bookId: number;
  chapter: number;
  verse: number;
  visitedAt: string;   // ISO 8601
}
```

---

### navigation.types.ts
**Purpose**: Expo Router navigation types

**Types**:

1. **RootStackParams**
```typescript
type RootStackParams = {
  index: undefined;
  'onboarding/slides': undefined;
  'onboarding/language': undefined;
  'onboarding/login': undefined;
};
```

2. **TabParams**
```typescript
type TabParams = {
  'home/index': undefined;
  'bible/index': undefined;
  'bible/[bookId]/index': { bookId: string };
  'bible/[bookId]/[chapter]': { 
    bookId: string; 
    chapter: string 
  };
  'search/index': undefined;
  'bookmarks/index': undefined;
  'settings/index': undefined;
};
```

---

## 🔧 Usage

### In Components
```typescript
import { Verse, BibleBook } from '@/types/bible.types';
import { User } from '@/types/user.types';
import { Bookmark } from '@/types/reading.types';

interface Props {
  verse: Verse;
  book: BibleBook;
  onBookmark: (verse: Verse) => void;
}

const VerseItem: React.FC<Props> = ({ verse, book }) => {
  // ...
};
```

### In Services
```typescript
import { Result } from '@/services/database';
import { Verse } from '@/types/bible.types';

export const getVerses = async (
  bookId: number, 
  chapter: number
): Promise<Result<Verse[]>> => {
  // ...
};
```

### In Stores
```typescript
import { Bookmark, Favorite } from '@/types/reading.types';

interface ReadingState {
  bookmarks: Bookmark[];
  favorites: Favorite[];
}
```

---

## 🛡️ Type Safety

**Strict Mode Enabled**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

**Benefits**:
- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code
- Easier refactoring

**Example**:
```typescript
// Type error caught at compile time
const verse: Verse = {
  id: 1,
  bookId: "Genesis",  // ❌ Error: must be number
  chapter: 1,
  verse: 1,
  textEng: "...",
  textTel: "..."
};
```

---

## 📝 Notes

- All types are exported from their respective files
- Use interfaces for object shapes
- Use type aliases for unions and primitives
- Future: Add API response types (v2)

## 🔗 Related

- See `src/store/README.md` for state types
- See `src/services/README.md` for Result type
- See [TypeScript Docs](https://www.typescriptlang.org/)
