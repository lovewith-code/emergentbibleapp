import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Redirect } from 'expo-router';
import { DARK, FONT, SPACE } from '@/constants/theme';
import { useAppStore } from '@/store/useAppStore';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setDbReady } = useAppStore();

  useEffect(() => {
    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log('Initialization timeout - proceeding anyway');
      setIsLoading(false);
    }, 3000);

    initializeApp().finally(() => {
      clearTimeout(timeout);
    });

    return () => clearTimeout(timeout);
  }, []);

  const initializeApp = async () => {
    try {
      console.log('Starting app initialization...');
      
      // Skip heavy DB operations for now - just proceed to app
      // Database will be initialized lazily when needed
      setDbReady(false); // Mark as not seeded, will use demo data
      
      console.log('App initialized successfully');
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setError('Failed to initialize app');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setIsLoading(true);
            initializeApp();
          }}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={DARK.gold} />
        <Text style={styles.text}>Loading HolyBook...</Text>
        <Text style={styles.subtext}>Please wait...</Text>
      </View>
    );
  }

  // For MVP: skip onboarding and go directly to home
  console.log('Redirecting to home...');
  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACE.xl,
  },
  text: {
    color: DARK.textPrimary,
    marginTop: SPACE.lg,
    fontSize: FONT.size.md,
    fontWeight: FONT.weight.semiBold,
  },
  subtext: {
    color: DARK.textSecondary,
    marginTop: SPACE.sm,
    fontSize: FONT.size.sm,
  },
  errorText: {
    color: DARK.error,
    fontSize: FONT.size.lg,
    textAlign: 'center',
    marginBottom: SPACE.xl,
  },
  retryButton: {
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.xl,
    backgroundColor: DARK.gold,
    borderRadius: 8,
  },
  retryText: {
    color: DARK.textOnGold,
    fontSize: FONT.size.md,
    fontWeight: FONT.weight.bold,
  },
});
