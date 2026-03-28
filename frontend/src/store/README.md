# src/store - State Management (Zustand)

This directory contains all global state management using Zustand with AsyncStorage persistence.

## 📄 Files

### useAppStore.ts
**Purpose**: App-level state (user, settings, onboarding)

**State**:
```typescript
user: User | null           // Current user
isGuest: boolean            // Guest mode
isOnboarded: boolean        // Completed onboarding
preferredLanguage: Language // English/Telugu/Both
isDbReady: boolean          // Database initialized
seedingProgress: number     // 0-100 during seeding
```

**Actions**:
- `setUser(user)` - Set authenticated user
- `continueAsGuest()` - Enable guest mode
- `setOnboarded()` - Mark onboarding complete
- `setLanguage(lang)` - Change language preference
- `setDbReady(ready)` - Update DB status
- `setSeedingProgress(pct)` - Update seeding progress
- `signOut()` - Clear user, reset to guest

**Persistence**: Saves to AsyncStorage (`@app_state`)

**Usage**:
```typescript
import { useAppStore } from '@/store/useAppStore';

const { user, preferredLanguage, setLanguage } = useAppStore();

if (preferredLanguage === 'telugu') {
  // Show Telugu
}
```

---

### useBibleStore.ts
**Purpose**: Bible reading state (position, preferences)

**State**:
```typescript
currentBookId: number       // Last read book (1-66)
currentChapter: number      // Last read chapter
currentVerse: number        // Last read verse
fontSize: FontSizeKey       // sm/md/lg/xl
lineSpacing: string         // normal/relaxed
```

**Actions**:
- `setPosition(bookId, chapter, verse?)` - Update reading position
- `setFontSize(size)` - Change font size
- `setLineSpacing(spacing)` - Change line spacing

**Persistence**: Saves to AsyncStorage (`@bible_state`)

**Usage**:
```typescript
import { useBibleStore } from '@/store/useBibleStore';

const { currentBookId, currentChapter, setPosition, fontSize } = useBibleStore();

// Save position
setPosition(bookId, chapter, verse);

// Get font size for rendering
const textSize = VERSE_FONT_SIZE[fontSize];
```

---

### useReadingStore.ts
**Purpose**: User reading data (bookmarks, favorites, highlights)

**State**:
```typescript
bookmarks: Bookmark[]      // All bookmarks
favorites: Favorite[]      // All favorites
highlights: Highlight[]    // All highlights
history: ReadingHistory[]  // Recent readings
```

**Actions**:

**Initialization**:
- `loadAll()` - Load all data from SQLite

**Bookmarks**:
- `addBookmark(bookId, chapter, verse, note?)` 
- `removeBookmark(id)`
- `isBookmarked(bookId, chapter, verse)` - Returns boolean

**Favorites**:
- `toggleFavorite(bookId, chapter, verse)` - Add or remove
- `isFavorited(bookId, chapter, verse)` - Returns boolean

**Highlights**:
- `setHighlight(bookId, chapter, verse, color)` - yellow/blue/green/pink
- `removeHighlight(id)`
- `getHighlightColor(bookId, chapter, verse)` - Returns color or null

**History**:
- `recordVisit(bookId, chapter, verse?)` - Log visit
- `getLastVisit()` - Returns last reading position

**Usage**:
```typescript
import { useReadingStore } from '@/store/useReadingStore';

const { bookmarks, addBookmark, isBookmarked } = useReadingStore();

// Check if verse is bookmarked
const isMarked = isBookmarked(1, 1, 1);

// Add bookmark
await addBookmark(1, 1, 1, 'Great verse!');
```

---

## 🔄 Data Flow

```
App Start
  ↓
useAppStore.initializeApp()
  ↓
Database Ready
  ↓
useReadingStore.loadAll()
  ↓
UI Renders with Data
```

## 💾 Persistence

**Persisted**:
- `useAppStore`: onboarding, language, guest status
- `useBibleStore`: All state (position, font, spacing)

**Not Persisted**:
- `useReadingStore`: Loaded from SQLite on demand

**Why?**
- Bookmarks/favorites may be large
- SQLite is source of truth
- Avoid data duplication

## 🤝 Store Communication

**Reading Position Flow**:
1. User navigates to chapter
2. Reader screen calls `useBibleStore.setPosition()`
3. Position saved to AsyncStorage
4. Home screen reads position for "Continue Reading"

**Bookmark Flow**:
1. User bookmarks verse
2. Reader calls `useReadingStore.addBookmark()`
3. Store calls database query
4. Database returns new bookmark
5. Store updates local state
6. UI re-renders automatically

## 🐛 Common Issues

### Store not updating UI
- Make sure component uses hook: `const { data } = useStore()`
- Zustand auto-subscribes to changes
- Check you're calling actions, not mutating state directly

### Persistence not working
- Check AsyncStorage permissions
- Clear app data if structure changed
- Check storage key names match

### Stale data after app restart
- Call `useReadingStore.loadAll()` on mount
- Check database isn't empty

## 🔗 Related

- See `src/services/README.md` for database operations
- See `src/types/README.md` for type definitions
- See [Zustand Docs](https://github.com/pmndrs/zustand)
