import type { NeoObjectsStackParamList } from '@/navigation/neo-objects-navigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, Text, View, ScrollView, StyleSheet } from 'react-native';

import {
  HazardousFilter,
  MagnitudeFilter,
  NameFilter,
} from '@/components/filters';
import { useNeoObjectsStore } from '@/core/store';
import {
  areSelectedFiltersTheSame,
  createNEOFilterSettings,
  getElevation,
  getFilterValue,
  horizontalScale,
  normalize,
  verticalScale,
} from '@/shared/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFilterState } from './use-filters-state';
import { useLocalFilters } from './use-local-filters';
import { useRangeMinMaxValues } from '@/core/hooks';
import { AntDesign } from '@expo/vector-icons';

type FiltersScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'Filters'
>;

export const Filters = ({ navigation }: FiltersScreenProps) => {
  const { filters, setFilters, neoObjects } = useNeoObjectsStore();

  const { setLocalFilters, filteredLocalFilters } = useLocalFilters(
    filters,
    neoObjects || [],
  );

  const {
    initialRangeFilter: initialMagnitudeFilter,
    maxValue: maxMagnitude,
    minValue: minMagnitude,
  } = useRangeMinMaxValues(neoObjects || [], 'absolute_magnitude_h');

  const {
    filterState: { name, absoluteMagnitude, isPotentiallyHazardous },
    setAbsoluteMagnitude,
    setIsPotentiallyHazardous,
    setName,
  } = useFilterState({
    name: getFilterValue('name', filters) || '',
    isPotentiallyHazardous: getFilterValue(
      'is_potentially_hazardous_asteroid',
      filters,
    ),
    absoluteMagnitude:
      getFilterValue('absolute_magnitude_h', filters) || initialMagnitudeFilter,
  });

  const onApplyFilters = () => {
    setFilters(filteredLocalFilters);
    navigation.goBack();
  };

  const onResetAllFilters = useCallback(() => {
    setName('');
    setIsPotentiallyHazardous(undefined);
    setAbsoluteMagnitude([minMagnitude, maxMagnitude]);
  }, []);

  useEffect(() => {
    setLocalFilters(
      createNEOFilterSettings({
        is_potentially_hazardous_asteroid: isPotentiallyHazardous,
        name,
        absolute_magnitude_h: absoluteMagnitude,
      }),
    );
  }, [name, absoluteMagnitude, isPotentiallyHazardous]);

  const areFiltersTheSame = useMemo(
    () => areSelectedFiltersTheSame(filters, filteredLocalFilters),
    [filters, filteredLocalFilters],
  );

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screenContainer,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.filtersHeaderContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <Pressable onPress={onResetAllFilters}>
          <Text style={styles.filterHeaderClearText}>Clear All</Text>
        </Pressable>
      </View>
      <Text style={styles.filtersTitle}>Filters</Text>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.filtersContainer}
      >
        <View style={styles.filtersContent}>
          <NameFilter value={name} setValue={(value) => setName(value)} />
          <HazardousFilter
            setValue={(val) => setIsPotentiallyHazardous(val)}
            value={isPotentiallyHazardous}
          />

          <MagnitudeFilter
            max={absoluteMagnitude[1]}
            maxRange={maxMagnitude}
            min={absoluteMagnitude[0]}
            minRange={minMagnitude}
            setValues={(range) => {
              const { min, max } = range;
              setAbsoluteMagnitude([min, max]);
            }}
          />
        </View>
      </ScrollView>
      <Pressable
        onPress={areFiltersTheSame ? () => {} : onApplyFilters}
        style={[
          styles.filtersApplyButton,
          areFiltersTheSame && {
            backgroundColor: '#ccc',
          },
        ]}
      >
        <Text style={styles.filtersApplyText}>Apply</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  filtersHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(15),
  },
  filterHeaderClearText: { fontWeight: '700' },
  filtersTitle: {
    fontSize: normalize(32),
    marginBottom: verticalScale(24),
    fontWeight: '800',
    paddingHorizontal: horizontalScale(10),
  },
  filtersContainer: { flexGrow: 1, paddingHorizontal: horizontalScale(10) },
  filtersContent: { flex: 1 },
  filtersApplyButton: {
    paddingVertical: verticalScale(14),
    alignSelf: 'center',
    paddingHorizontal: horizontalScale(20),
    backgroundColor: 'orange',
    width: horizontalScale(200),
    borderRadius: verticalScale(40),
    ...getElevation({
      elevation: 10,
    }),
  },
  filtersApplyText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: normalize(20),
  },
});
