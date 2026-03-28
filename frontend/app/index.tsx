import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { DARK, FONT, SPACE } from '@/constants/theme';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick initialization - just wait a moment for app to settle
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>📖</Text>
        <Text style={styles.title}>HolyBook</Text>
        <Text style={styles.subtitle}>పవిత్ర గ్రంథం</Text>
        <ActivityIndicator size="large" color={DARK.gold} style={styles.spinner} />
      </View>
    );
  }

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
  logo: {
    fontSize: 80,
    marginBottom: SPACE.lg,
  },
  title: {
    fontSize: FONT.size.hero,
    fontWeight: FONT.weight.bold,
    color: DARK.gold,
    marginBottom: SPACE.xs,
  },
  subtitle: {
    fontSize: FONT.size.lg,
    color: DARK.textSecondary,
    marginBottom: SPACE.xxxl,
  },
  spinner: {
    marginTop: SPACE.xl,
  },
});
