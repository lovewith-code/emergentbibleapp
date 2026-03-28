import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DARK, FONT, SPACE, RADIUS } from '@/constants/theme';
import { searchVerses } from '@/services/bibleService';
import { getBookById } from '@/data/bibleMetadata';
import { Verse } from '@/types/bible.types';
import { truncate } from '@/utils/textHelpers';
import { useAppStore } from '@/store/useAppStore';

export default function SearchScreen() {
  const router = useRouter();
  const { preferredLanguage } = useAppStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const result = await searchVerses(text, preferredLanguage);
    if (result.data) {
      setResults(result.data);
    }
    setIsLoading(false);
  };

  const renderResult = ({ item }: { item: Verse }) => {
    const book = getBookById(item.bookId);
    const text =
      preferredLanguage === 'english'
        ? item.textEng
        : preferredLanguage === 'telugu'
        ? item.textTel
        : item.textTel;

    return (
      <TouchableOpacity
        style={styles.resultCard}
        onPress={() =>
          router.push(
            `/(tabs)/bible/[bookId]/[chapter]?bookId=${item.bookId}&chapter=${item.chapter}&verse=${item.verse}`
          )
        }
      >
        <Text style={styles.resultReference}>
          {book?.nameEnglish} {item.chapter}:{item.verse}
        </Text>
        <Text style={styles.resultText}>{truncate(text, 150)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={DARK.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search verses..."
            placeholderTextColor={DARK.textMuted}
            value={query}
            onChangeText={handleSearch}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={DARK.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={DARK.gold} />
        </View>
      ) : query.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={64} color={DARK.textMuted} />
          <Text style={styles.emptyText}>Search for any verse</Text>
          <Text style={styles.emptySubtext}>Enter at least 3 characters</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color={DARK.textMuted} />
          <Text style={styles.emptyText}>No verses found</Text>
          <Text style={styles.emptySubtext}>Try a different search term</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderResult}
          keyExtractor={(item, index) => `${item.bookId}-${item.chapter}-${item.verse}-${index}`}
          contentContainerStyle={styles.resultsList}
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
  searchContainer: {
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE.sm,
    borderWidth: 1,
    borderColor: DARK.border,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT.size.md,
    color: DARK.textPrimary,
    marginLeft: SPACE.sm,
    paddingVertical: SPACE.sm,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACE.xxxl,
  },
  emptyText: {
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
  resultsList: {
    padding: SPACE.lg,
  },
  resultCard: {
    backgroundColor: DARK.card,
    borderRadius: RADIUS.md,
    padding: SPACE.lg,
    marginBottom: SPACE.md,
    borderWidth: 1,
    borderColor: DARK.border,
  },
  resultReference: {
    fontSize: FONT.size.base,
    color: DARK.gold,
    fontWeight: FONT.weight.semiBold,
    marginBottom: SPACE.sm,
  },
  resultText: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    lineHeight: FONT.size.base * FONT.lineHeight.relaxed,
  },
});