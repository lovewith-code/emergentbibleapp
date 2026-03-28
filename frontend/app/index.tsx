import React from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Directly redirect to home - no loading needed
  return <Redirect href="/(tabs)/home" />;
}
