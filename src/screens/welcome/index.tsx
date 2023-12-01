import { Text, Button } from 'react-native';
import React from 'react';
import { useAppStore } from '@/core/store';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Welcome = () => {
  const { setIsWelcomed } = useAppStore();

  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      <Button title="Sign out" onPress={() => setIsWelcomed(true)} />
    </SafeAreaView>
  );
};
