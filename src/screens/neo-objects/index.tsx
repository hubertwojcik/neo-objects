import { Asteroid } from '@/components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NeoObjectsStackParamList } from '../../navigation/neo-objects-navigator';

type NeoObjectsScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'NeoObjects'
>;
export const NeoObjects = (props: NeoObjectsScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={{ flex: 1 }}>
        <Asteroid />
      </Animated.View>
      <View style={{ flex: 2.5 }}>
        <Button
          title="Sign out"
          onPress={() => props.navigation.navigate('NeoObjectDetails')}
        />
      </View>
    </SafeAreaView>
  );
};
