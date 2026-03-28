import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DARK, FONT, SPACE, RADIUS } from '../../../src/constants/theme';
import { useAppStore } from '../../../src/store/useAppStore';
import { useBibleStore } from '../../../src/store/useBibleStore';
import { APP_VERSION } from '../../../src/constants/config';

export default function SettingsScreen() {
  const { user, isGuest, preferredLanguage, setLanguage, signOut, continueAsGuest } =
    useAppStore();
  const { fontSize, setFontSize } = useBibleStore();

  const languageOptions: Array<{ value: any; label: string }> = [
    { value: 'english', label: 'English' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'both', label: 'Both' },
  ];

  const fontSizeOptions: Array<{ value: any; label: string }> = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ];

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          signOut();
          Alert.alert('Signed Out', 'You have been signed out successfully');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {isGuest ? (
            <View style={styles.accountCard}>
              <View style={styles.accountInfo}>
                <Ionicons name="person-circle" size={48} color={DARK.textMuted} />
                <View style={styles.accountText}>
                  <Text style={styles.accountName}>Guest User</Text>
                  <Text style={styles.accountEmail}>Reading offline</Text>
                </View>
              </View>
            </View>
          ) : user ? (
            <View style={styles.accountCard}>
              <View style={styles.accountInfo}>
                <Ionicons name="person-circle" size={48} color={DARK.gold} />
                <View style={styles.accountText}>
                  <Text style={styles.accountName}>{user.name}</Text>
                  <Text style={styles.accountEmail}>{user.email}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.signInButton} onPress={continueAsGuest}>
              <Text style={styles.signInText}>Continue as Guest</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Language Preference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <View style={styles.optionGroup}>
            {languageOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  preferredLanguage === option.value && styles.optionButtonActive,
                ]}
                onPress={() => setLanguage(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    preferredLanguage === option.value && styles.optionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
                {preferredLanguage === option.value && (
                  <Ionicons name="checkmark-circle" size={20} color={DARK.gold} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Font Size */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading Size</Text>
          <View style={styles.optionGroup}>
            {fontSizeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  fontSize === option.value && styles.optionButtonActive,
                ]}
                onPress={() => setFontSize(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    fontSize === option.value && styles.optionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
                {fontSize === option.value && (
                  <Ionicons name="checkmark-circle" size={20} color={DARK.gold} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.appName}>HolyBook</Text>
            <Text style={styles.appSubtitle}>పవిత్ర గ్రంథం</Text>
            <Text style={styles.appTagline}>The Word, Always With You</Text>
            <Text style={styles.appVersion}>Version {APP_VERSION}</Text>
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
  section: {
    marginBottom: SPACE.xxxl,
  },
  sectionTitle: {
    fontSize: FONT.size.lg,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.bold,
    paddingHorizontal: SPACE.lg,
    marginBottom: SPACE.md,
  },
  accountCard: {
    marginHorizontal: SPACE.lg,
    padding: SPACE.lg,
    backgroundColor: DARK.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: DARK.border,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACE.md,
  },
  accountText: {
    marginLeft: SPACE.md,
    flex: 1,
  },
  accountName: {
    fontSize: FONT.size.md,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.semiBold,
  },
  accountEmail: {
    fontSize: FONT.size.sm,
    color: DARK.textSecondary,
    marginTop: 2,
  },
  signOutButton: {
    padding: SPACE.md,
    backgroundColor: DARK.surface,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: FONT.size.base,
    color: DARK.error,
    fontWeight: FONT.weight.semiBold,
  },
  signInButton: {
    marginHorizontal: SPACE.lg,
    padding: SPACE.lg,
    backgroundColor: DARK.gold,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  signInText: {
    fontSize: FONT.size.md,
    color: DARK.textOnGold,
    fontWeight: FONT.weight.bold,
  },
  optionGroup: {
    marginHorizontal: SPACE.lg,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACE.lg,
    backgroundColor: DARK.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: DARK.border,
    marginBottom: SPACE.sm,
  },
  optionButtonActive: {
    borderColor: DARK.gold,
    backgroundColor: DARK.goldMuted,
  },
  optionText: {
    fontSize: FONT.size.md,
    color: DARK.textPrimary,
    fontWeight: FONT.weight.medium,
  },
  optionTextActive: {
    color: DARK.gold,
    fontWeight: FONT.weight.semiBold,
  },
  aboutCard: {
    marginHorizontal: SPACE.lg,
    padding: SPACE.xl,
    backgroundColor: DARK.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: DARK.borderGold,
    alignItems: 'center',
  },
  appName: {
    fontSize: FONT.size.xxl,
    color: DARK.gold,
    fontWeight: FONT.weight.bold,
  },
  appSubtitle: {
    fontSize: FONT.size.lg,
    color: DARK.textSecondary,
    marginTop: SPACE.xs,
  },
  appTagline: {
    fontSize: FONT.size.sm,
    color: DARK.textMuted,
    marginTop: SPACE.md,
    fontStyle: 'italic',
  },
  appVersion: {
    fontSize: FONT.size.xs,
    color: DARK.textMuted,
    marginTop: SPACE.lg,
  },
});