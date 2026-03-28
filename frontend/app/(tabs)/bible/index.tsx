import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DARK, FONT, SPACE, RADIUS } from '@/constants/theme';
import { BIBLE_BOOKS, getBooksByTestament } from '@/data/bibleMetadata';

export default function BibleScreen() {
  const router = useRouter();
  const oldTestament = getBooksByTestament('old');
  const newTestament = getBooksByTestament('new');

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      law: DARK.law,
      history: DARK.history,
      poetry: DARK.poetry,
      prophecy: DARK.prophecy,
      gospel: DARK.gospel,
      epistle: DARK.epistle,
      apocalypse: DARK.apocalypse,
    };
    return colors[category] || DARK.gold;
  };

  const renderBook = (book: any) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCard}
      onPress={() => router.push({ pathname: '/(tabs)/bible/[bookId]', params: { bookId: String(book.id) } })}
    >
      <View style={styles.bookLeft}>
        <View
          style={[
            styles.bookIcon,
            { backgroundColor: `${getCategoryColor(book.category)}20` },
          ]}
        >
          <Ionicons name="book" size={20} color={getCategoryColor(book.category)} />
        </View>
        <View style={styles.bookInfo}>
          <Text style={styles.bookName}>{book.nameEnglish}</Text>
          <Text style={styles.bookNameTelugu}>{book.nameTelugu}</Text>
        </View>
      </View>
      <View style={styles.bookRight}>
        <Text style={styles.chapterCount}>{book.chapters} chapters</Text>
        <Ionicons name="chevron-forward" size={20} color={DARK.textMuted} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Old Testament */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Old Testament</Text>
          <Text style={styles.sectionSubtitle}>{oldTestament.length} Books</Text>
          {oldTestament.map(renderBook)}
        </View>

        {/* New Testament */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Testament</Text>
          <Text style={styles.sectionSubtitle}>{newTestament.length} Books</Text>
          {newTestament.map(renderBook)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK.bg,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: SPACE.xxxl,
  },
  sectionTitle: {
    fontSize: FONT.size.xl,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.bold,
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
  },
  sectionSubtitle: {
    fontSize: FONT.size.sm,
    color: DARK.textSecondary,
    paddingHorizontal: SPACE.lg,
    paddingBottom: SPACE.md,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.lg,
    borderBottomWidth: 1,
    borderBottomColor: DARK.border,
  },
  bookLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    marginLeft: SPACE.md,
    flex: 1,
  },
  bookName: {
    fontSize: FONT.size.md,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.semiBold,
  },
  bookNameTelugu: {
    fontSize: FONT.size.sm,
    color: DARK.textSecondary,
    marginTop: 2,
  },
  bookRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterCount: {
    fontSize: FONT.size.sm,
    color: DARK.textMuted,
    marginRight: SPACE.sm,
  },
});