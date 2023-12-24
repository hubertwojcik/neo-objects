import { useGetNeoObjects } from '@/api/neo-objects/use-get-neo-objects';
import { Asteroid, DateChanger, NeoObjectListItem } from '@/components';
import { useChangeDate, useFilterNeoObjects } from '@/core/hooks';
import { useNeoObjectsStore } from '@/core/store';
import { colors, verticalScale } from '@/shared/utils';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NeoObjectsStackParamList } from '../../navigation/neo-objects-navigator';

import { styles } from './styles';

type NeoObjectsScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'NeoObjects'
>;

export const NeoObjects = ({ navigation }: NeoObjectsScreenProps) => {
  const { date, decrementDate, incrementDate } = useChangeDate();

  const { filters } = useNeoObjectsStore();

  const { neoObjects, isLoading } = useGetNeoObjects(date);
  const filteredData = useFilterNeoObjects(neoObjects || [], filters);

  const contactsPlaceholderList = useMemo(() => {
    return Array.from({ length: 15 }).map(() => null);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Near Earth Objects</Text>
      <Asteroid />
      <View style={styles.neoListContainer}>
        <View>
          <Pressable
            onPress={() => navigation.navigate('Filters')}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingVertical: verticalScale(10),
            }}
          >
            <Ionicons name="options" size={24} color={colors.dark} />
          </Pressable>
          <DateChanger
            date={date}
            decrementDate={decrementDate}
            incrementDate={incrementDate}
          />
        </View>
        <FlatList
          data={
            !neoObjects || isLoading ? contactsPlaceholderList : filteredData
          }
          style={styles.neoListStyle}
          ItemSeparatorComponent={() => {
            return <View style={styles.neoListSeparator} />;
          }}
          renderItem={({ item }) => {
            return (
              <NeoObjectListItem
                item={item}
                onDetailsPress={() =>
                  item &&
                  navigation.navigate('NeoObjectDetails', {
                    id: item.id,
                  })
                }
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
