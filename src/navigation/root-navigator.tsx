import { useAuthStore } from '@/core/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './auth-navigator';
import { HomeNavigator } from './home-navigator';
import { NavigationContainer } from './navigation-container';
import React from 'react';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { authenticationStatus } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticationStatus === 'signOut' ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="App" component={HomeNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
