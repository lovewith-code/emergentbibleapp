import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DARK, FONT, SPACE, RADIUS } from '@/constants/theme';
import { useBookmarkStore, Bookmark } from '@/store/useBookmarkStore';
import { getBookById } from '@/data/bibleMetadata';
import { useAppStore } from '@/store/useAppStore';

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarks, removeBookmark, clearAll } = useBookmarkStore();
  const { preferredLanguage } = useAppStore();

  const handleClearAll = () => {
    if (bookmarks.length === 0) return;
    Alert.alert(
      'Clear All Bookmarks',
      'Are you sure you want to remove all bookmarks?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: clearAll },
      ]
    );
  };

  const handleRemove = (id: string) => {
    removeBookmark(id);
  };

  const renderBookmark = ({ item }: { item: Bookmark }) => {
    const book = getBookById(item.bookId);
    const displayText =
      preferredLanguage === 'english'
        ? item.textEng
        : item.textTel || item.textEng;

    return (
      <TouchableOpacity
        style={styles.bookmarkCard}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/bible/[bookId]/[chapter]',
            params: {
              bookId: String(item.bookId),
              chapter: String(item.chapter),
            },
          })
        }
        activeOpacity={0.7}
      >
        <View style={styles.bookmarkHeader}>
          <View style={styles.referenceContainer}>
            <Ionicons name="bookmark" size={16} color={DARK.gold} />
            <Text style={styles.reference}>
              {book?.nameEnglish || 'Unknown'} {item.chapter}:{item.verse}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleRemove(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle" size={22} color={DARK.textMuted} />
          </TouchableOpacity>
        </View>
        <Text style={styles.verseText} numberOfLines={3}>
          {displayText}
        </Text>
        {preferredLanguage === 'both' && item.textEng ? (
          <Text style={styles.verseTextSecondary} numberOfLines={2}>
            {item.textEng}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Bookmarks</Text>
        {bookmarks.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={72} color={DARK.textMuted} />
          <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the bookmark icon on any verse to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderBookmark}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK.bg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.md,
  },
  title: {
    fontSize: FONT.size.xxl,
    color: DARK.gold,
    fontWeight: FONT.weight.bold,
  },
  clearText: {
    fontSize: FONT.size.base,
    color: DARK.error,
    fontWeight: FONT.weight.medium,
  },
  listContent: {
    padding: SPACE.lg,
    paddingTop: SPACE.sm,
  },
  bookmarkCard: {
    backgroundColor: DARK.card,
    borderRadius: RADIUS.md,
    padding: SPACE.lg,
    marginBottom: SPACE.md,
    borderWidth: 1,
    borderColor: DARK.border,
  },
  bookmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACE.sm,
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reference: {
    fontSize: FONT.size.base,
    color: DARK.gold,
    fontWeight: FONT.weight.semiBold,
    marginLeft: SPACE.sm,
  },
  verseText: {
    fontSize: FONT.size.base,
    color: DARK.textPrimary,
    lineHeight: FONT.size.base * FONT.lineHeight.relaxed,
  },
  verseTextSecondary: {
    fontSize: FONT.size.sm,
    color: DARK.textSecondary,
    lineHeight: FONT.size.sm * FONT.lineHeight.relaxed,
    marginTop: SPACE.xs,
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
    lineHeight: FONT.size.base * FONT.lineHeight.relaxed,
  },
});
