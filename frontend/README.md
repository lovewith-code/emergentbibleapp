# HolyBook - Bilingual Bible Mobile App

**పవిత్ర గ్రంథం (The Word, Always With You)**

A production-ready, offline-first bilingual Bible mobile app built with React Native, Expo, and TypeScript.

## 📱 Features

- ✅ **Bilingual Support**: Telugu (IRV) + English (KJV)
- ✅ **Offline First**: All data stored locally in SQLite
- ✅ **66 Books**: Complete Old & New Testament
- ✅ **Smart Navigation**: Easy chapter-to-chapter navigation
- ✅ **Search**: Full-text verse search
- ✅ **Bookmarks & Highlights**: Save and mark verses
- ✅ **Reading History**: Track your reading progress
- ✅ **Beautiful UI**: Dark mode with gold accents
- ✅ **Customizable**: Font size, language preferences

## 🏗️ Project Structure

```
/app/frontend/
├── app/              # Expo Router screens (file-based routing)
├── src/              # Source code
│   ├── components/   # Reusable UI components
│   ├── constants/    # Theme, config, feature flags
│   ├── data/         # Static data (Bible metadata)
│   ├── services/     # Database, API services
│   ├── store/        # State management (Zustand)
│   ├── types/        # TypeScript definitions
│   └── utils/        # Helper functions
├── assets/           # Images, fonts, Bible data files
└── babel.config.js   # Babel configuration with path aliases
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Yarn or npm
- Expo CLI
- Expo Go app (for mobile testing)

### Installation

```bash
cd /app/frontend
yarn install
```

### Running the App

```bash
# Start Expo development server
yarn start

# Or with specific platform
yarn android  # Android
yarn ios      # iOS
yarn web      # Web
```

### Building for Production

```bash
# Build with EAS
eas build --platform android
eas build --platform ios
```

## 📚 Documentation

### Folder Documentation
- [app/](./app/README.md) - Expo Router screens and navigation
- [src/components/](./src/components/README.md) - UI components
- [src/constants/](./src/constants/README.md) - Theme and configuration
- [src/data/](./src/data/README.md) - Bible metadata
- [src/services/](./src/services/README.md) - Database and services
- [src/store/](./src/store/README.md) - State management
- [src/types/](./src/types/README.md) - TypeScript types
- [src/utils/](./src/utils/README.md) - Utility functions

## 🎨 Design System

### Colors
- **Primary**: Gold (#C9A84C) - Brand accent
- **Background**: Deep navy (#0A0A0F, #12121A)
- **Text**: White (#FFFFFF) primary, muted (#8888AA)

### Typography
- **Sizes**: xs(11px) to hero(38px)
- **Weights**: Regular(400) to Bold(700)
- **Line Heights**: Tight(1.25) to Verse(2.0) for comfortable reading

## 🗄️ Database Schema

### Tables
1. **verses** - All Bible verses (Telugu + English)
2. **bookmarks** - User bookmarked verses
3. **favorites** - Favorited verses
4. **highlights** - Highlighted verses with colors
5. **reading_history** - Reading progress tracking

## 🔧 Configuration

### Environment Variables
```env
EXPO_PACKAGER_HOSTNAME=your-hostname
EXPO_PUBLIC_BACKEND_URL=your-backend-url
```

### Feature Flags (src/constants/config.ts)
```typescript
AI_CHAT: false        // v2 feature
AUDIO_BIBLE: false    // v2 feature
SYNC: false           // v2 feature
```

## 📖 Usage

### Adding Bible Data

1. Place your Bible JSON files in `assets/data/`:
   - `bible_tel.json` (Telugu IRV)
   - `bible_eng.json` (English KJV)

2. Format:
```json
{
  "Book": [{
    "Chapter": [{
      "Verse": [{
        "Verseid": "01001001",
        "Verse": "Verse text..."
      }]
    }]
  }]
}
```

3. App will auto-seed database on first launch

### Path Aliases

Use `@/` to import from src:
```typescript
import { DARK } from '@/constants/theme';
import { useAppStore } from '@/store/useAppStore';
```

## 🧪 Testing

### Mobile Testing
1. Start expo: `yarn start`
2. Scan QR code with Expo Go app
3. Test on physical device

### Web Testing
```bash
yarn web
# Open http://localhost:3000
```

## 📦 Dependencies

### Core
- expo ~51.0.0
- react-native 0.74.0
- expo-router ~3.5.0

### Database
- expo-sqlite ~14.0.0
- @react-native-async-storage/async-storage

### State Management
- zustand ^4.5.2

### UI
- expo-linear-gradient
- @expo/vector-icons
- react-native-safe-area-context

## 🤝 Contributing

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- 2 spaces indentation
- Max 300 lines per file

### Commit Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code formatting
refactor: Code refactoring
test: Add tests
```

## 📝 License

Private - All rights reserved

## 👥 Team

RcubiX Technologies | Rabbuni M.

## 🐛 Known Issues

1. Expo tunnel may fail due to ngrok limits (use --no-tunnel)
2. Some expo packages need version updates (see warnings)
3. Shadow props deprecated (use boxShadow instead)

## 🚧 Roadmap

### v1.0 (Current)
- ✅ Basic reading functionality
- ✅ Bookmarks and search
- ✅ Bilingual support

### v2.0 (Planned)
- [ ] AI Chat assistant
- [ ] Audio Bible
- [ ] Cross-device sync (Supabase)
- [ ] Reading plans

### v3.0 (Future)
- [ ] Community features
- [ ] Strong's concordance
- [ ] Prayer wall

## 📞 Support

For issues or questions, check the folder-specific README files or contact the development team.

---

**Built with ❤️ for Bible readers worldwide**