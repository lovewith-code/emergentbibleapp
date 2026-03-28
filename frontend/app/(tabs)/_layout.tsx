import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DARK } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DARK.tabActive,
        tabBarInactiveTintColor: DARK.tabInactive,
        tabBarStyle: {
          backgroundColor: DARK.tabBg,
          borderTopColor: DARK.tabBorder,
          borderTopWidth: 1,
          height: 60,
        },
        headerStyle: {
          backgroundColor: DARK.bg,
        },
        headerTintColor: DARK.textPrimary,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bible/index"
        options={{
          title: 'Bible',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      {/* Hide nested dynamic routes from tab bar */}
      <Tabs.Screen
        name="bible/[bookId]/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="bible/[bookId]/[chapter]"
        options={{ href: null }}
      />
    </Tabs>
  );
}
