import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DARK, FONT, SPACE, RADIUS } from '@/constants/theme';
import { useBibleStore } from '@/store/useBibleStore';
import { getBookById } from '@/data/bibleMetadata';

export default function HomeScreen() {
  const router = useRouter();
  const { currentBookId, currentChapter } = useBibleStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const currentBook = getBookById(currentBookId);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.appTitle}>HolyBook</Text>
            <Text style={styles.appSubtitle}>పవిత్ర గ్రంథం</Text>
          </View>
        </View>

        {/* Daily Verse Card */}
        <View style={styles.dailyVerseCard}>
          <Text style={styles.dailyVerseLabel}>TODAY'S VERSE</Text>
          <Text style={styles.verseText}>
            ఆదియందు దేవుడు భూమ్యాకాశములను సృజించెను.
          </Text>
          <Text style={styles.verseTextEng}>
            In the beginning God created the heaven and the earth.
          </Text>
          <Text style={styles.verseReference}>Genesis 1:1</Text>
        </View>

        {/* Continue Reading */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
          <TouchableOpacity
            style={styles.continueCard}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/bible/[bookId]',
                params: { bookId: String(currentBookId) },
              })
            }
          >
            <View style={styles.continueContent}>
              <Ionicons name="book-outline" size={32} color={DARK.gold} />
              <View style={styles.continueText}>
                <Text style={styles.continueTitle}>
                  {currentBook?.nameEnglish || 'Genesis'}
                </Text>
                <Text style={styles.continueSubtitle}>
                  Chapter {currentChapter}
                </Text>
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
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/bible/[bookId]',
                  params: { bookId: '19' },
                })
              }
            >
              <Ionicons name="musical-notes" size={28} color="#E87040" />
              <Text style={styles.quickLabel}>Psalms</Text>
              <Text style={styles.quickLabelTelugu}>కీర్తనలు</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, { backgroundColor: 'rgba(232,112,64,0.15)' }]}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/bible/[bookId]',
                  params: { bookId: '20' },
                })
              }
            >
              <Ionicons name="bulb" size={28} color="#E87040" />
              <Text style={styles.quickLabel}>Proverbs</Text>
              <Text style={styles.quickLabelTelugu}>సామెతలు</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, { backgroundColor: 'rgba(34,197,94,0.15)' }]}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/bible/[bookId]',
                  params: { bookId: '40' },
                })
              }
            >
              <Ionicons name="book" size={28} color="#22C55E" />
              <Text style={styles.quickLabel}>Matthew</Text>
              <Text style={styles.quickLabelTelugu}>మత్తయి</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, { backgroundColor: 'rgba(201,168,76,0.15)' }]}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Ionicons name="search" size={28} color={DARK.gold} />
              <Text style={styles.quickLabel}>Search</Text>
              <Text style={styles.quickLabelTelugu}>వెతకండి</Text>
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
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.xl,
  },
  greeting: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    fontWeight: FONT.weight.regular,
  },
  appTitle: {
    fontSize: FONT.size.xxl,
    color: DARK.gold,
    fontWeight: FONT.weight.bold,
    marginTop: SPACE.xs,
  },
  appSubtitle: {
    fontSize: FONT.size.md,
    color: DARK.textSecondary,
    marginTop: 2,
  },
  dailyVerseCard: {
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xl,
    padding: SPACE.xl,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: DARK.borderGold,
    backgroundColor: '#1C1505',
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
    marginBottom: SPACE.sm,
  },
  verseTextEng: {
    fontSize: FONT.size.base,
    color: DARK.textSecondary,
    lineHeight: FONT.size.base * FONT.lineHeight.relaxed,
    marginBottom: SPACE.lg,
    fontStyle: 'italic',
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
    width: '46%',
    margin: '2%',
    aspectRatio: 1.2,
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
  quickLabelTelugu: {
    fontSize: FONT.size.sm,
    color: DARK.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
});
