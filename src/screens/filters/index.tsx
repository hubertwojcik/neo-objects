import { View, Text, Button } from 'react-native';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NeoObjectsStackParamList } from '@/navigation/neo-objects-navigator';

type FiltersScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'Filters'
>;

export const Filters = ({ navigation }: FiltersScreenProps) => {
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <Text>Filters</Text>
      <Button title="Apply" onPress={() => navigation.goBack()} />
    </View>
  );
};
