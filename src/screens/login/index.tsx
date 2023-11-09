import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuthStore } from '@/core/store';

export const Login = () => {
  const { signIn } = useAuthStore();
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Sign in" onPress={signIn} />
    </View>
  );
};
