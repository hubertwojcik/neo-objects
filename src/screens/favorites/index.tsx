import type { TabList } from '@/navigation/tab-navigator';
import { View, Text } from 'react-native';
import React from 'react';

export const Favorites = (props: TabList<'Favorites'>) => {
  console.log('====================================');
  console.log(props);
  console.log('====================================');
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
