import { View, Text, Button } from 'react-native';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NeoObjectsStackParamList } from '@/navigation/neo-objects-navigator';

type NeoObjectDetailsScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'NeoObjectDetails'
>;

export const NeoObjectDetails = ({
  navigation,
}: NeoObjectDetailsScreenProps) => {
  return (
    <View>
      <Button title="go back" onPress={() => navigation.goBack()} />
      <Text>Home</Text>
    </View>
  );
};
