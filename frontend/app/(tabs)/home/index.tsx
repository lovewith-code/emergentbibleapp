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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DARK, FONT, SPACE, RADIUS, SHADOW } from '../../../src/constants/theme';
import { useAppStore } from '../../../src/store/useAppStore';
import { useBibleStore } from '../../../src/store/useBibleStore';
import { getBookById } from '../../../src/data/bibleMetadata';
import { getVerse } from '../../../src/services/database/verses.queries';
import { getDailySeed } from '../../../src/utils/dateHelpers';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isGuest, preferredLanguage } = useAppStore();
  const { currentBookId, currentChapter } = useBibleStore();
  const [dailyVerse, setDailyVerse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDailyVerse();
  }, []);

  const loadDailyVerse = async () => {
    try {
      // Simple daily verse logic: use day of year to pick a verse
      const seed = getDailySeed();
      const bookId = (seed % 66) + 1;
      const chapter = ((seed / 100) % 20) + 1;
      const verse = (seed % 10) + 1;

      const result = await getVerse(bookId, Math.floor(chapter), Math.floor(verse));
      if (result.data) {
        const book = getBookById(bookId);
        setDailyVerse({
          ...result.data,
          bookName: preferredLanguage === 'telugu' ? book?.nameTelugu : book?.nameEnglish,
        });
      }
    } catch (error) {
      console.error('Error loading daily verse:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getName = () => {
    if (user) return user.name.split(' ')[0];
    if (isGuest) return 'Guest';
    return 'Reader';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()} 👋</Text>
            <Text style={styles.name}>{getName()}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={24} color={DARK.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Daily Verse Card */}
        {isLoading ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={DARK.gold} />
          </View>
        ) : dailyVerse ? (
          <LinearGradient
            colors={['#1C1505', '#2A1F08']}
            style={styles.dailyVerseCard}
          >
            <Text style={styles.dailyVerseLabel}>TODAY'S VERSE</Text>
            <Text style={styles.verseText}>
              {preferredLanguage === 'english'
                ? dailyVerse.textEng
                : preferredLanguage === 'telugu'
                ? dailyVerse.textTel
                : dailyVerse.textTel}
            </Text>
            <Text style={styles.verseReference}>
              {dailyVerse.bookName} {dailyVerse.chapter}:{dailyVerse.verse}
            </Text>
          </LinearGradient>
        ) : null}

        {/* Continue Reading */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
          <TouchableOpacity
            style={styles.continueCard}
            onPress={() => router.push(`/bible/[bookId]/[chapter]?bookId=${currentBookId}&chapter=${currentChapter}`)}
          >
            <View style={styles.continueContent}>
              <Ionicons name="book-outline" size={32} color={DARK.gold} />
              <View style={styles.continueText}>
                <Text style={styles.continueTitle}>
                  {getBookById(currentBookId)?.nameEnglish}
                </Text>
                <Text style={styles.continueSubtitle}>Chapter {currentChapter}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={DARK.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickGrid}>
            <TouchableOpacity
              style={[styles.quickCard, { backgroundColor: 'rgba(232,112,64,0.15)' }]}
              onPress={() => router.push('/bible?bookId=19')}
            >
              <Ionicons name="musical-notes" size={28} color="#E87040" />
              <Text style={styles.quickLabel}>Psalms</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, { backgroundColor: 'rgba(232,112,64,0.15)' }]}
              onPress={() => router.push('/bible?bookId=20')}
            >
              <Ionicons name="bulb" size={28} color="#E87040" />
              <Text style={styles.quickLabel}>Proverbs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, { backgroundColor: 'rgba(34,197,94,0.15)' }]}
              onPress={() => router.push('/bible?bookId=40')}
            >
              <Ionicons name="book" size={28} color="#22C55E" />
              <Text style={styles.quickLabel}>Matthew</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, { backgroundColor: 'rgba(201,168,76,0.15)' }]}
              onPress={() => router.push('/search')}
            >
              <Ionicons name="search" size={28} color={DARK.gold} />
              <Text style={styles.quickLabel}>Search</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.xl,
  },
  greeting: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    fontWeight: FONT.weight.regular,
  },
  name: {
    fontSize: FONT.size.xl,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.bold,
    marginTop: SPACE.xs,
  },
  settingsButton: {
    padding: SPACE.sm,
  },
  loadingCard: {
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xl,
    padding: SPACE.xxxl,
    borderRadius: RADIUS.lg,
    backgroundColor: DARK.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyVerseCard: {
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xl,
    padding: SPACE.xl,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: DARK.borderGold,
    ...SHADOW.gold,
  },
  dailyVerseLabel: {
    fontSize: FONT.size.xs,
    color: DARK.gold,
    fontWeight: FONT.weight.bold,
    letterSpacing: 2,
    marginBottom: SPACE.md,
  },
  verseText: {
    fontSize: FONT.size.lg,
    color: DARK.textPrimary,
    lineHeight: FONT.size.lg * FONT.lineHeight.relaxed,
    marginBottom: SPACE.lg,
  },
  verseReference: {
    fontSize: FONT.size.base,
    color: DARK.gold,
    fontWeight: FONT.weight.semiBold,
  },
  section: {
    marginBottom: SPACE.xl,
  },
  sectionTitle: {
    fontSize: FONT.size.lg,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.bold,
    paddingHorizontal: SPACE.lg,
    marginBottom: SPACE.md,
  },
  continueCard: {
    marginHorizontal: SPACE.lg,
    padding: SPACE.lg,
    backgroundColor: DARK.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: DARK.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  continueText: {
    marginLeft: SPACE.md,
    flex: 1,
  },
  continueTitle: {
    fontSize: FONT.size.md,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.semiBold,
  },
  continueSubtitle: {
    fontSize: FONT.size.sm,
    color: DARK.textSecondary,
    marginTop: SPACE.xs,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACE.lg - SPACE.sm,
  },
  quickCard: {
    width: '48%',
    aspectRatio: 1.2,
    margin: SPACE.sm,
    padding: SPACE.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: FONT.size.base,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.semiBold,
    marginTop: SPACE.sm,
    textAlign: 'center',
  },
});