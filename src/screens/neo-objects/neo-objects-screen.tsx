import { useGetNeoObjects } from '@/api/neo-objects/use-get-neo-objects';
import { Asteroid, DateChanger, NeoObjectListItem } from '@/components';
import { useChangeDate, useFilterNeoObjects } from '@/core/hooks';
import { useNeoObjectsStore } from '@/core/store';
import {
  colors,
  horizontalScale,
  normalize,
  verticalScale,
} from '@/shared/utils';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NeoObjectsStackParamList } from '../../navigation/neo-objects-navigator';

type NeoObjectsScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'NeoObjects'
>;

export const NeoObjects = ({ navigation }: NeoObjectsScreenProps) => {
  const { date, decrementDate, incrementDate } = useChangeDate();

  const { filters } = useNeoObjectsStore();

  const { neoObjects, isLoading, isError } = useGetNeoObjects(date);

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
            <Ionicons name="options" size={24} color={colors.black} />
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
          ListEmptyComponent={
            !isError ? (
              <View>
                <Text>There are no NEO Objects to show</Text>
              </View>
            ) : (
              <View>
                <Text>Wystąpił błąd, spróbuj ponownie</Text>
              </View>
            )
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
                    objectName: item.name,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenTitle: {
    fontSize: normalize(26),
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  neoListContainer: { flex: 3, paddingHorizontal: horizontalScale(10) },
  neoListStyle: {
    paddingHorizontal: horizontalScale(10),
  },
  neoListSeparator: {
    height: 1,
    width: '100%',
    marginVertical: verticalScale(5),
  },
});
