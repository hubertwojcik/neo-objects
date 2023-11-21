import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeNavigator } from './tab-navigator';
import { NavigationContainer } from './navigation-container';
import React from 'react';
import { Welcome } from '@/screens';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isOnboarding = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboarding ? (
          <Stack.Screen name="welcome" component={Welcome} />
        ) : (
          <Stack.Screen name="App" component={HomeNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
