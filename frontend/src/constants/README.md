# src/constants - Configuration & Design System

This directory contains all app-wide constants including the complete design system and feature configuration.

## 📄 Files

### theme.ts
**Purpose**: Complete design system - single source of truth for all visual styling

**Exports**:
1. **Color Palettes**
   - `DARK` - Dark mode colors (primary)
   - `LIGHT` - Light mode colors

2. **Typography**
   - `FONT.size` - xs(11) to hero(38)
   - `FONT.weight` - regular to bold
   - `FONT.lineHeight` - tight to verse(2.0)
   - `FONT.family` - Platform-specific fonts

3. **Spacing**
   - `SPACE` - xs(4) to huge(64)
   - 8-point grid system

4. **Border Radius**
   - `RADIUS` - xs(6) to full(9999)

5. **Shadows**
   - `SHADOW` - none, sm, md, lg, gold

6. **Gradients**
   - `GRADIENT` - gold, darkBg, dailyVerse, etc.

7. **Animation Durations**
   - `ANIM` - fast(150ms) to skeleton(1200ms)

**Color Categories**:
```typescript
// Dark Mode
DARK.bg = '#0A0A0F'          // Main background
DARK.gold = '#C9A84C'         // Brand accent
DARK.textPrimary = '#FFFFFF'  // Main text
DARK.textSecondary = '#8888AA' // Muted text

// Book Categories
DARK.law = Gold
DARK.history = Blue
DARK.poetry = Orange
DARK.prophecy = Purple
DARK.gospel = Green
DARK.epistle = Red
DARK.apocalypse = Pink
```

**Usage**:
```typescript
import { DARK, FONT, SPACE, RADIUS } from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK.bg,
    padding: SPACE.lg,
    borderRadius: RADIUS.md,
  },
  title: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.bold,
    color: DARK.textPrimary,
  },
});
```

**Design Principles**:
- Never hardcode colors - always use theme constants
- Use 8-point spacing grid
- Maintain consistent shadows
- Follow typography scale

---

### config.ts
**Purpose**: App configuration and feature flags

**Exports**:

1. **Feature Flags** (`FEATURES`)
```typescript
AI_CHAT: false         // v2 - AI assistant
AUDIO_BIBLE: false     // v2 - Audio playback
COMMUNITY: false       // v3 - Social features
SYNC: false            // v2 - Cloud sync
READING_PLANS: false   // v2 - Daily plans
STRONGS: false         // v3 - Concordance
```

2. **App Constants**
```typescript
APP_VERSION = '1.0.0'
DB_VERSION = 1
SEARCH_MIN_CHARS = 3
SEARCH_DEBOUNCE_MS = 400
DB_SEED_CHUNK_SIZE = 500
HISTORY_MAX_RECORDS = 100
SKELETON_COUNT = 8
```

**Usage**:
```typescript
import { APP_VERSION, SEARCH_MIN_CHARS, FEATURES } from '@/constants/config';

// Check feature availability
if (FEATURES.AI_CHAT) {
  // Show AI chat button
}

// Use app constants
if (query.length >= SEARCH_MIN_CHARS) {
  performSearch(query);
}
```

**Feature Flag Strategy**:
- Set to `false` for unreleased features
- Change to `true` when ready to ship
- Allows building UI without breaking app
- Easy A/B testing

---

## 🎨 Design System Usage

### Colors
**DO**:
```typescript
backgroundColor: DARK.bg
color: DARK.textPrimary
borderColor: DARK.borderGold
```

**DON'T**:
```typescript
backgroundColor: '#0A0A0F'  // Hardcoded
color: 'white'               // Generic
borderColor: 'gold'          // Imprecise
```

### Spacing
**DO**:
```typescript
padding: SPACE.lg            // 16px
marginVertical: SPACE.md     // 12px
gap: SPACE.sm                // 8px
```

**DON'T**:
```typescript
padding: 16                  // Magic number
marginVertical: 12           // Not from scale
gap: 7                       // Random value
```

### Typography
**DO**:
```typescript
fontSize: FONT.size.xl       // 24px
fontWeight: FONT.weight.bold // '700'
lineHeight: FONT.size.xl * FONT.lineHeight.normal
```

**DON'T**:
```typescript
fontSize: 24                 // Not from scale
fontWeight: 'bold'           // Use weight constant
lineHeight: 32               // Calculate from base
```

## 🔗 Related

- All UI components use these constants
- See `src/components/README.md` for component styling
- See `app/README.md` for screen usage

## 📝 Notes

- Theme is immutable (uses `as const`)
- All values are TypeScript typed
- Light mode ready but not actively used
- Future: Add theme provider for runtime switching
