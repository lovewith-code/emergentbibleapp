import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DARK, FONT, SPACE, RADIUS } from '../../../../src/constants/theme';
import { getBookById } from '../../../../src/data/bibleMetadata';

export default function BookDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const bookId = parseInt(params.bookId as string);
  const book = getBookById(bookId);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found</Text>
      </View>
    );
  }

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          title: book.nameEnglish,
          headerShown: true,
          headerStyle: { backgroundColor: DARK.bg },
          headerTintColor: DARK.textPrimary,
        }}
      />
      <View style={styles.header}>
        <Text style={styles.bookTitle}>{book.nameEnglish}</Text>
        <Text style={styles.bookTitleTelugu}>{book.nameTelugu}</Text>
        <Text style={styles.chapterCount}>{book.chapters} Chapters</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.chapterGrid}>
          {chapters.map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterButton}
              onPress={() =>
                router.push(`/(tabs)/bible/[bookId]/[chapter]?bookId=${bookId}&chapter=${chapter}`)
              }
            >
              <Text style={styles.chapterNumber}>{chapter}</Text>
            </TouchableOpacity>
          ))}
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
  header: {
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.lg,
    borderBottomWidth: 1,
    borderBottomColor: DARK.border,
  },
  bookTitle: {
    fontSize: FONT.size.xxl,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.bold,
  },
  bookTitleTelugu: {
    fontSize: FONT.size.lg,
    color: DARK.textSecondary,
    marginTop: SPACE.xs,
  },
  chapterCount: {
    fontSize: FONT.size.sm,
    color: DARK.textMuted,
    marginTop: SPACE.sm,
  },
  scrollView: {
    flex: 1,
  },
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACE.lg - SPACE.xs,
  },
  chapterButton: {
    width: '22%',
    aspectRatio: 1,
    margin: SPACE.xs,
    backgroundColor: DARK.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: DARK.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumber: {
    fontSize: FONT.size.lg,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.semiBold,
  },
  errorText: {
    fontSize: FONT.size.md,
    color: DARK.error,
    textAlign: 'center',
  },
});