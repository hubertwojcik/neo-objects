import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuthStore } from '@/core/store';

export const Home = () => {
  const { signOut } = useAuthStore();
  return (
    <View>
      <Text>Home</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};
