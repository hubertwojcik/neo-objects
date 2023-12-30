import { Filters, NeoObjectDetails, NeoObjects } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type NeoObjectsStackParamList = {
  NeoObjects: undefined;
  NeoObjectDetails: {
    id: string;
  };
  Filters: undefined;
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
      <Stack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="NeoObjectDetails"
          component={NeoObjectDetails}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <Stack.Screen name="Filters" component={Filters} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
