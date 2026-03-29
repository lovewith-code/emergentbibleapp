import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DARK, FONT, SPACE, RADIUS, VERSE_FONT_SIZE } from '@/constants/theme';
import { getBookById } from '@/data/bibleMetadata';
import { getVersesByChapter } from '@/services/bibleService';
import { Verse } from '@/types/bible.types';
import { useAppStore } from '@/store/useAppStore';
import { useBibleStore } from '@/store/useBibleStore';
import { useBookmarkStore } from '@/store/useBookmarkStore';

export default function ChapterReaderScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { preferredLanguage } = useAppStore();
  const { fontSize, setPosition } = useBibleStore();
  const { addBookmark, removeBookmark, isBookmarked, getBookmarkId } =
    useBookmarkStore();
  const bookId = parseInt(params.bookId as string);
  const chapter = parseInt(params.chapter as string);
  const book = getBookById(bookId);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVerses();
    setPosition(bookId, chapter);
  }, [bookId, chapter]);

  const loadVerses = async () => {
    setIsLoading(true);
    setError(null);
    const result = await getVersesByChapter(bookId, chapter);
    if (result.error) {
      setError(result.error);
    } else {
      setVerses(result.data || []);
    }
    setIsLoading(false);
  };

  const toggleBookmark = (verse: Verse) => {
    const bkmkId = getBookmarkId(verse.bookId, verse.chapter, verse.verse);
    if (bkmkId) {
      removeBookmark(bkmkId);
    } else {
      addBookmark({
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        textTel: verse.textTel,
        textEng: verse.textEng,
      });
    }
  };

  const canGoPrevious = chapter > 1 || bookId > 1;
  const canGoNext = chapter < (book?.chapters || 1) || bookId < 66;

  const handlePrevious = () => {
    if (chapter > 1) {
      router.setParams({ chapter: (chapter - 1).toString() });
    } else if (bookId > 1) {
      const prevBook = getBookById(bookId - 1);
      if (prevBook) {
        router.push({
          pathname: '/(tabs)/bible/[bookId]/[chapter]',
          params: {
            bookId: String(bookId - 1),
            chapter: String(prevBook.chapters),
          },
        });
      }
    }
  };

  const handleNext = () => {
    if (chapter < (book?.chapters || 1)) {
      router.setParams({ chapter: (chapter + 1).toString() });
    } else if (bookId < 66) {
      router.push({
        pathname: '/(tabs)/bible/[bookId]/[chapter]',
        params: { bookId: String(bookId + 1), chapter: '1' },
      });
    }
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Stack.Screen
        options={{
          title: `${book.nameEnglish} ${chapter}`,
          headerShown: true,
          headerStyle: { backgroundColor: DARK.bg },
          headerTintColor: DARK.textPrimary,
        }}
      />

      {/* Chapter Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.bookName}>{book.nameEnglish}</Text>
          <Text style={styles.bookNameTel}>{book.nameTelugu}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.chapterTitle}>Chapter {chapter}</Text>
          <Text style={styles.verseCount}>
            {verses.length} {verses.length === 1 ? 'verse' : 'verses'}
          </Text>
        </View>
      </View>

      {/* Verses */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={DARK.gold} />
          <Text style={styles.loadingText}>Loading verses...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={DARK.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadVerses}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : verses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color={DARK.textMuted} />
          <Text style={styles.emptyTitle}>No verses available</Text>
          <Text style={styles.emptySubtext}>
            Full Bible data will be loaded soon
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.versesContainer}>
            {verses.map((verse) => {
              const saved = isBookmarked(verse.bookId, verse.chapter, verse.verse);
              return (
                <View key={verse.id} style={styles.verseRow}>
                  <View style={styles.verseNumberCol}>
                    <Text style={styles.verseNumber}>{verse.verse}</Text>
                    <TouchableOpacity
                      onPress={() => toggleBookmark(verse)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      style={styles.bookmarkButton}
                    >
                      <Ionicons
                        name={saved ? 'bookmark' : 'bookmark-outline'}
                        size={16}
                        color={saved ? DARK.gold : DARK.textMuted}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.verseTextContainer}>
                    {(preferredLanguage === 'telugu' ||
                      preferredLanguage === 'both') && (
                      <Text
                        style={[
                          styles.verseText,
                          { fontSize: VERSE_FONT_SIZE[fontSize] },
                        ]}
                      >
                        {verse.textTel}
                      </Text>
                    )}
                    {(preferredLanguage === 'english' ||
                      preferredLanguage === 'both') && (
                      <Text
                        style={[
                          styles.verseText,
                          preferredLanguage === 'both' &&
                            styles.verseTextSecondary,
                          {
                            fontSize: VERSE_FONT_SIZE[fontSize] * 0.9,
                          },
                        ]}
                      >
                        {verse.textEng}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{ height: 24 }} />
        </ScrollView>
      )}

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, !canGoPrevious && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={!canGoPrevious}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={canGoPrevious ? DARK.textPrimary : DARK.textMuted}
          />
          <Text
            style={[
              styles.navButtonText,
              !canGoPrevious && styles.navButtonTextDisabled,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.navCenter}>
          <Text style={styles.navCenterText}>
            {book.nameEnglish} · {chapter} / {book.chapters}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navButton, !canGoNext && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <Text
            style={[
              styles.navButtonText,
              !canGoNext && styles.navButtonTextDisabled,
            ]}
          >
            Next
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={canGoNext ? DARK.textPrimary : DARK.textMuted}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.md,
    borderBottomWidth: 1,
    borderBottomColor: DARK.border,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  bookName: {
    fontSize: FONT.size.lg,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.bold,
  },
  bookNameTel: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    marginTop: 2,
  },
  chapterTitle: {
    fontSize: FONT.size.xl,
    color: DARK.gold,
    fontWeight: FONT.weight.bold,
  },
  verseCount: {
    fontSize: FONT.size.sm,
    color: DARK.textMuted,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  versesContainer: {
    padding: SPACE.lg,
  },
  verseRow: {
    flexDirection: 'row',
    marginBottom: SPACE.lg,
    paddingBottom: SPACE.md,
    borderBottomWidth: 0.5,
    borderBottomColor: DARK.border,
  },
  verseNumberCol: {
    width: 32,
    alignItems: 'center',
    paddingTop: 2,
  },
  verseNumber: {
    fontSize: FONT.size.xs,
    color: DARK.gold,
    fontWeight: FONT.weight.bold,
  },
  bookmarkButton: {
    marginTop: 6,
    padding: 4,
  },
  verseTextContainer: {
    flex: 1,
  },
  verseText: {
    color: DARK.textVerse,
    lineHeight: FONT.size.md * FONT.lineHeight.verse,
    marginBottom: SPACE.xs,
  },
  verseTextSecondary: {
    color: DARK.textSecondary,
    marginTop: SPACE.sm,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACE.xxxl,
  },
  emptyTitle: {
    fontSize: FONT.size.lg,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.semiBold,
    marginTop: SPACE.lg,
  },
  emptySubtext: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    marginTop: SPACE.sm,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    marginTop: SPACE.md,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACE.xxxl,
  },
  errorText: {
    fontSize: FONT.size.base,
    color: DARK.error,
    textAlign: 'center',
    marginTop: SPACE.md,
  },
  retryButton: {
    marginTop: SPACE.lg,
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.xl,
    backgroundColor: DARK.gold,
    borderRadius: RADIUS.sm,
  },
  retryText: {
    fontSize: FONT.size.base,
    color: DARK.textOnGold,
    fontWeight: FONT.weight.semiBold,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.lg,
    backgroundColor: DARK.navStrip,
    borderTopWidth: 1,
    borderTopColor: DARK.navStripBorder,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACE.sm,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: FONT.size.sm,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.medium,
    marginHorizontal: SPACE.xs,
  },
  navButtonTextDisabled: {
    color: DARK.textMuted,
  },
  navCenter: {
    flex: 1,
    alignItems: 'center',
  },
  navCenterText: {
    fontSize: FONT.size.sm,
    color: DARK.textSecondary,
    fontWeight: FONT.weight.medium,
  },
});
