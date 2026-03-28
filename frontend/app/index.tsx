import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { DARK } from '../src/constants/theme';
import { useAppStore } from '../src/store/useAppStore';
import { initDatabase, isDbSeeded } from '../src/services/database';
import { logger } from '../src/utils/logger';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const { isOnboarded, isDbReady, setDbReady } = useAppStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize database
      const dbInit = await initDatabase();
      if (dbInit.error) {
        logger.error('Index', 'Failed to initialize database', { error: dbInit.error });
      }

      // Check if DB is seeded
      const seeded = await isDbSeeded();
      setDbReady(seeded);

      logger.info('Index', 'App initialized', { seeded, isOnboarded });
    } catch (error) {
      logger.error('Index', 'Error initializing app', { error });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={DARK.gold} />
        <Text style={styles.text}>Loading HolyBook...</Text>
      </View>
    );
  }

  // For MVP: skip onboarding and go directly to home
  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: DARK.textSecondary,
    marginTop: 16,
    fontSize: 14,
  },
});
