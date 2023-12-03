import { useGetAllNeoObjects } from '@/api/neo-objects/get-neo-objects';
import { Asteroid, NeoObjectListItem } from '@/components';
import { horizontalScale } from '@/shared/utils';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import type { NeoObjectsStackParamList } from '../../navigation/neo-objects-navigator';

// type NeoObjectsScreenProps = NativeStackScreenProps<
//   NeoObjectsStackParamList,
//   'NeoObjects'
// >;
export const NeoObjects = () => {
  const { data } = useGetAllNeoObjects({
    startDate: '2023-10-20',
    endDate: '2023-10-20',
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: horizontalScale(10) }}>
      <Asteroid />

      <View style={{ flex: 3 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>PREV</Text>
          </View>
          <Text>CUrrent date </Text>
          <View>
            <Text>NEXT</Text>
          </View>
        </View>
        <FlatList
          data={data?.near_earth_objects['2023-10-20']}
          renderItem={({ item }) => {
            return <NeoObjectListItem item={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};
