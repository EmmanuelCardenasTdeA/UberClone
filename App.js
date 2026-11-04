import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RegistrationNavigator from './src/navigation/RegistrationNavigator';
import { colors } from './src/theme/theme';


export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="dark" />
          <RegistrationNavigator />
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};