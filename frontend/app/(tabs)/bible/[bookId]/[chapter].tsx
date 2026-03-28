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
import { DARK, FONT, SPACE, RADIUS, VERSE_FONT_SIZE } from '../../../../src/constants/theme';
import { getBookById } from '../../../../src/data/bibleMetadata';
import { getVersesByChapter } from '../../../../src/services/database/verses.queries';
import { Verse } from '../../../../src/types/bible.types';
import { useAppStore } from '../../../../src/store/useAppStore';
import { useBibleStore } from '../../../../src/store/useBibleStore';

export default function ChapterReaderScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { preferredLanguage } = useAppStore();
  const { fontSize, setPosition } = useBibleStore();
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

  const canGoPrevious = chapter > 1 || bookId > 1;
  const canGoNext = chapter < (book?.chapters || 1) || bookId < 66;

  const handlePrevious = () => {
    if (chapter > 1) {
      router.setParams({ chapter: (chapter - 1).toString() });
    } else if (bookId > 1) {
      const prevBook = getBookById(bookId - 1);
      if (prevBook) {
        router.push(
          `/(tabs)/bible/[bookId]/[chapter]?bookId=${bookId - 1}&chapter=${prevBook.chapters}`
        );
      }
    }
  };

  const handleNext = () => {
    if (chapter < (book?.chapters || 1)) {
      router.setParams({ chapter: (chapter + 1).toString() });
    } else if (bookId < 66) {
      router.push(`/(tabs)/bible/[bookId]/[chapter]?bookId=${bookId + 1}&chapter=1`);
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
        <Text style={styles.bookName}>{book.nameEnglish}</Text>
        <Text style={styles.chapterTitle}>Chapter {chapter}</Text>
        <Text style={styles.verseCount}>
          {verses.length} {verses.length === 1 ? 'verse' : 'verses'}
        </Text>
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
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.versesContainer}>
            {verses.map((verse) => (
              <View key={verse.id} style={styles.verseRow}>
                <Text style={styles.verseNumber}>{verse.verse}</Text>
                <View style={styles.verseTextContainer}>
                  {(preferredLanguage === 'telugu' || preferredLanguage === 'both') && (
                    <Text style={[styles.verseText, { fontSize: VERSE_FONT_SIZE[fontSize] }]}>
                      {verse.textTel}
                    </Text>
                  )}
                  {(preferredLanguage === 'english' || preferredLanguage === 'both') && (
                    <Text
                      style={[
                        styles.verseText,
                        preferredLanguage === 'both' && styles.verseTextSecondary,
                        { fontSize: VERSE_FONT_SIZE[fontSize] * 0.9 },
                      ]}
                    >
                      {verse.textEng}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
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
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.md,
    borderBottomWidth: 1,
    borderBottomColor: DARK.border,
  },
  bookName: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    fontWeight: FONT.weight.medium,
  },
  chapterTitle: {
    fontSize: FONT.size.xl,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.bold,
    marginTop: SPACE.xs,
  },
  verseCount: {
    fontSize: FONT.size.sm,
    color: DARK.textMuted,
    marginTop: SPACE.xs,
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
  },
  verseNumber: {
    fontSize: FONT.size.xs,
    color: DARK.gold,
    fontWeight: FONT.weight.bold,
    width: 28,
    paddingTop: 2,
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