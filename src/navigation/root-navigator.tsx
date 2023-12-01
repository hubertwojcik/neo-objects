import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeNavigator } from './tab-navigator';
import { NavigationContainer } from './navigation-container';
import React from 'react';
import { Welcome } from '@/screens';
import { useAppStore } from '@/core/store';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isWelcomed } = useAppStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isWelcomed ? (
          <Stack.Screen name="welcome" component={Welcome} />
        ) : (
          <Stack.Screen name="App" component={HomeNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
