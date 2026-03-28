# HolyBook - Bilingual Bible App PRD

## Overview
Offline-first React Native Bible app supporting bilingual reading (Telugu and English). Reads directly from nested JSON files.

## User's JSON Structure
```json
{"Book":[{"Chapter":[{"Verse":[{"Verseid":"BBCCCVVV","Verse":"text"}]}]}]}
```
Where `Verseid` format: BB=BookId, CCC=ChapterId, VVV=VerseId

## Completed Features
- [x] App renders (white screen FIXED)
- [x] Tab-based navigation: Home, Bible, Search, Settings
- [x] Home screen with daily verse, continue reading, quick access
- [x] Bible screen: Full 66-book list with Telugu names
- [x] Book detail: Chapter grid picker
- [x] Chapter reader: Bilingual verse display (Telugu + English)
- [x] Chapter navigation (Previous/Next)
- [x] Settings: Language selection (English/Telugu/Both), Font size
- [x] Search screen (structure ready)
- [x] JSON parsing via Verseid field for correct book/chapter/verse mapping

## Sample Data
Currently using sample data with Genesis (2 chapters) and Psalms (2 chapters).
User will provide full 66-book JSON files later.

## Tech Stack
- Expo SDK 54 + React Native
- Expo Router (file-based routing)
- Zustand (state management with AsyncStorage persistence)
- Local JSON files (no SQLite, no backend)

## Upcoming Tasks
- [ ] User to upload full Telugu + English Bible JSON files
- [ ] Implement in-memory search indexing
- [ ] Bookmarks/Favorites with AsyncStorage/MMKV
- [ ] Font size applying to verse reader
- [ ] Theme toggling (Dark/Light)
