import { View, Text, Button } from 'react-native';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NeoObjectsStackParamList } from '../../navigation/neo-objects-navigator';

type NeoObjectsScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'NeoObjects'
>;

export const NeoObjects = (props: NeoObjectsScreenProps) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Sign out"
        onPress={() => props.navigation.navigate('NeoObjectDetails')}
      />
    </View>
  );
};
