import { NeoObjectDetails, NeoObjects } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type NeoObjectsStackParamList = {
  NeoObjects: undefined;
  NeoObjectDetails: undefined;
};

const Stack = createNativeStackNavigator<NeoObjectsStackParamList>();

export const NeoObjectsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NeoObjects" component={NeoObjects} />
      <Stack.Screen name="NeoObjectDetails" component={NeoObjectDetails} />
    </Stack.Navigator>
  );
};
