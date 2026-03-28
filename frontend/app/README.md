# App Directory - Expo Router Screens

This directory contains all navigable screens using Expo Router's file-based routing system.

## 📁 Structure

```
app/
├── index.tsx           # App entry point
├── _layout.tsx         # Root layout (if needed)
└── (tabs)/             # Tab navigation group
    ├── _layout.tsx     # Tab bar configuration
    ├── home/
    │   └── index.tsx   # Home screen
    ├── bible/
    │   ├── index.tsx   # Books list
    │   └── [bookId]/   # Dynamic book routes
    │       ├── index.tsx      # Chapters grid
    │       └── [chapter].tsx  # Verse reader
    ├── search/
    │   └── index.tsx   # Search screen
    └── settings/
        └── index.tsx   # Settings screen
```

## 🗺️ Route Mapping

| File Path | Route | Screen |
|-----------|-------|--------|
| `index.tsx` | `/` | App initialization & routing |
| `(tabs)/home/index.tsx` | `/home` | Home screen with daily verse |
| `(tabs)/bible/index.tsx` | `/bible` | List of all 66 books |
| `(tabs)/bible/[bookId]/index.tsx` | `/bible/1` | Chapter grid for book |
| `(tabs)/bible/[bookId]/[chapter].tsx` | `/bible/1/1` | Verse reader |
| `(tabs)/search/index.tsx` | `/search` | Verse search |
| `(tabs)/settings/index.tsx` | `/settings` | App settings |

## 📄 Files

### index.tsx
**Purpose**: App entry point and initialization

**What it does**:
- Initializes SQLite database
- Checks if Bible data is seeded
- Shows loading screen
- Redirects to home screen

**Imports**:
- `@/constants/theme` - Design tokens
- `@/store/useAppStore` - App state
- `@/services/database` - Database functions
- `@/utils/logger` - Logging utility

**Key Functions**:
- `initializeApp()` - Sets up database and checks data

---

### (tabs)/_layout.tsx
**Purpose**: Tab navigation configuration

**What it does**:
- Defines bottom tab bar
- Configures 4 tabs: Home, Bible, Search, Settings
- Sets active/inactive colors
- Adds icons for each tab

**Tab Configuration**:
```typescript
- Home: Ionicons 'home'
- Bible: Ionicons 'book'
- Search: Ionicons 'search'
- Settings: Ionicons 'settings'
```

---

### (tabs)/home/index.tsx
**Purpose**: Home screen - app dashboard

**What it displays**:
1. **Greeting**: "Good morning/afternoon/evening, [Name]"
2. **Daily Verse Card**: Random verse of the day
3. **Continue Reading**: Last read chapter
4. **Quick Access**: Psalms, Proverbs, Matthew, Search

**Imports**:
- `@/constants/theme` - Styling
- `@/store/useAppStore` - User preferences
- `@/store/useBibleStore` - Reading position
- `@/data/bibleMetadata` - Book information
- `@/services/database/verses.queries` - Fetch verses

**Key Functions**:
- `loadDailyVerse()` - Loads or generates daily verse
- `getGreeting()` - Time-based greeting
- `getName()` - Gets user name or "Guest"

---

### (tabs)/bible/index.tsx
**Purpose**: Books list screen

**What it displays**:
- All 66 Bible books
- Grouped by Old/New Testament
- Color-coded by category
- Book names in English + Telugu
- Chapter counts

**Imports**:
- `@/data/bibleMetadata` - Book data
- `BIBLE_BOOKS`, `getBooksByTestament()` - Book helpers

**Navigation**:
- Tapping book → `/bible/[bookId]` (Chapters screen)

**Book Categories & Colors**:
- Law: Gold
- History: Blue
- Poetry: Orange
- Prophecy: Purple
- Gospel: Green
- Epistle: Red
- Apocalypse: Pink

---

### (tabs)/bible/[bookId]/index.tsx
**Purpose**: Chapter grid screen

**What it displays**:
- Book name (English + Telugu)
- Total chapter count
- Grid of chapter buttons (4 columns)
- Last read chapter highlighted in gold

**Dynamic Route**:
- URL: `/bible/1` (Genesis)
- Param: `bookId` (1-66)

**Imports**:
- `useLocalSearchParams` - Get bookId from URL
- `@/data/bibleMetadata` - Get book details

**Navigation**:
- Tapping chapter → `/bible/[bookId]/[chapter]` (Reader)

---

### (tabs)/bible/[bookId]/[chapter].tsx
**Purpose**: Verse reader screen (MAIN READING SCREEN)

**What it displays**:
1. **Header**: Book name, chapter, verse count
2. **Verses**: Scrollable list of verses
3. **Footer**: Previous/Next chapter navigation

**Dynamic Route**:
- URL: `/bible/1/1` (Genesis Chapter 1)
- Params: `bookId`, `chapter`

**Features**:
- Bilingual display (Telugu/English/Both)
- Adjustable font size
- Chapter navigation with cross-book support
- Verse numbers in gold
- Loading and error states

**Imports**:
- `@/services/database/verses.queries` - Fetch verses
- `@/store/useBibleStore` - Font size, position
- `@/store/useAppStore` - Language preference

**Key Functions**:
- `loadVerses()` - Fetch chapter verses from database
- `handlePrevious()` - Navigate to previous chapter/book
- `handleNext()` - Navigate to next chapter/book

---

### (tabs)/search/index.tsx
**Purpose**: Verse search screen

**What it displays**:
- Search input with debouncing
- Language filter (All/English/Telugu)
- Search results with verse references
- Empty states and loading states

**Imports**:
- `@/services/database/verses.queries` - `searchVerses()`
- `@/utils/textHelpers` - `truncate()`
- `@/store/useAppStore` - Language preference

**Key Functions**:
- `handleSearch()` - Debounced search with 3+ char min
- `renderResult()` - Result card with navigation

**Search Logic**:
1. User types query
2. Wait 400ms (debounce)
3. If 3+ chars, search database
4. Show results with verse reference
5. Tap result → Navigate to verse in reader

---

### (tabs)/settings/index.tsx
**Purpose**: App settings screen

**What it displays**:
1. **Account**: User info or Guest mode
2. **Language**: English / Telugu / Both
3. **Reading Size**: Font size options (4 sizes)
4. **About**: App version, tagline

**Imports**:
- `@/store/useAppStore` - User, language
- `@/store/useBibleStore` - Font size
- `@/constants/config` - App version

**Settings Options**:

**Language**:
- English: Show only English text
- Telugu: Show only Telugu text
- Both: Show both languages

**Font Size**:
- Small: 15px
- Medium: 17px
- Large: 20px
- Extra Large: 24px

**Account Actions**:
- Sign Out (if logged in)
- Continue as Guest (if not logged in)

---

## 🎯 Navigation Flow

```
App Start (index.tsx)
    ↓
Home Screen (/home)
    ├─→ Settings (/settings)
    ├─→ Search (/search)
    └─→ Bible (/bible)
            ↓
        Book List
            ↓
        Chapters (/bible/[bookId])
            ↓
        Reader (/bible/[bookId]/[chapter])
```

## 🔄 Data Flow

1. **App Init**: `index.tsx` → Database init → Check seeding
2. **Home Load**: Fetch daily verse from SQLite
3. **Books Load**: Read from `bibleMetadata.ts` (static)
4. **Chapters Load**: Read metadata for selected book
5. **Reader Load**: Query SQLite for verses
6. **Search**: Query SQLite with LIKE operator

## 🎨 Styling

All screens use:
- `StyleSheet.create()` for styles
- Theme constants from `@/constants/theme`
- SafeAreaView for proper insets
- Responsive layouts with Flexbox

## 📱 Platform Support

All screens work on:
- ✅ iOS
- ✅ Android
- ✅ Web (responsive)

## 🐛 Common Issues

### Route not found
- Check file is in `app/` directory
- Check file exports default component
- Restart Metro bundler

### Params not working
- Use `useLocalSearchParams()` from expo-router
- Check param names match file names `[paramName]`

### Navigation not working
- Use `useRouter()` from expo-router
- Use `router.push()` for navigation
- Check route path starts with `/`

## 🔗 Related

- [Expo Router Docs](https://expo.github.io/router/docs/)
- [Navigation Guide](../docs/navigation.md)
- [State Management](../src/store/README.md)
