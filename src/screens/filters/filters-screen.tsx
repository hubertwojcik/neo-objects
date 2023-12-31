import type { NeoObjectsStackParamList } from '@/navigation/neo-objects-navigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HazardousFilter, NameFilter, RangeFilter } from '@/components/filters';
import { useRangeMinMaxValues } from '@/core/hooks';
import { useNeoObjectsStore } from '@/core/store';
import {
  areSelectedFiltersTheSame,
  createNEOFilterSettings,
  extractActiveNEOFilters,
  getElevation,
  getFilterValue,
  horizontalScale,
  normalize,
  verticalScale,
} from '@/shared/utils';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFilterState } from './use-filters-state';

type FiltersScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'Filters'
>;

export const Filters = ({ navigation }: FiltersScreenProps) => {
  const { filters, setFilters, neoObjects } = useNeoObjectsStore();

  const [localFilters, setLocalFilters] = useState(filters);

  const filteredLocalFilters = useMemo(
    () => extractActiveNEOFilters(localFilters, neoObjects || []),
    [localFilters, neoObjects],
  );

  const {
    initialRangeFilter: initialMagnitudeFilter,
    maxValue: maxMagnitude,
    minValue: minMagnitude,
  } = useRangeMinMaxValues(neoObjects || [], 'absoluteMagnitudeH');

  const {
    maxValue: maxMinEstimatedDiameter,
    minValue: minMinEstimatedDiameter,
    initialRangeFilter: initialMinEstimatedRange,
  } = useRangeMinMaxValues(neoObjects || [], 'estimatedDiameterMinMeters');

  const {
    maxValue: maxMaxEstimatedDiameter,
    minValue: minMaxEstimatedDiameter,
    initialRangeFilter: initialMaxEstimatedRange,
  } = useRangeMinMaxValues(neoObjects || [], 'estimatedDiameterMaxMeters');

  const {
    filterState: {
      name,
      absoluteMagnitude,
      isPotentiallyHazardous,
      estimatedDiameterMaxMeters,
      estimatedDiameterMinMeters,
    },
    setAbsoluteMagnitude,
    setIsPotentiallyHazardous,
    setName,
    setMaxEstimatedDiameter,
    setMinEstimatedDiameter,
  } = useFilterState({
    name: getFilterValue('name', filters) || '',
    isPotentiallyHazardous: getFilterValue(
      'isPotentiallyHazardousAsteroid',
      filters,
    ),
    absoluteMagnitude:
      getFilterValue('absoluteMagnitudeH', filters) || initialMagnitudeFilter,
    estimatedDiameterMinMeters:
      getFilterValue('estimatedDiameterMinMeters', filters) ||
      initialMinEstimatedRange,
    estimatedDiameterMaxMeters:
      getFilterValue('estimatedDiameterMaxMeters', filters) ||
      initialMaxEstimatedRange,
  });

  const onApplyFilters = () => {
    setFilters(filteredLocalFilters);
    navigation.goBack();
  };

  const onResetAllFilters = useCallback(() => {
    setName('');
    setIsPotentiallyHazardous(undefined);
    setAbsoluteMagnitude([minMagnitude, maxMagnitude]);
    setMinEstimatedDiameter([minMinEstimatedDiameter, maxMinEstimatedDiameter]);
    setMaxEstimatedDiameter([minMaxEstimatedDiameter, maxMaxEstimatedDiameter]);
  }, []);

  useEffect(() => {
    setLocalFilters(
      createNEOFilterSettings({
        isPotentiallyHazardousAsteroid: isPotentiallyHazardous,
        name,
        absoluteMagnitudeH: absoluteMagnitude,
        estimatedDiameterMinMeters: estimatedDiameterMinMeters,
        estimatedDiameterMaxMeters: estimatedDiameterMaxMeters,
      }),
    );
  }, [
    name,
    absoluteMagnitude,
    isPotentiallyHazardous,
    estimatedDiameterMaxMeters,
    estimatedDiameterMinMeters,
  ]);

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

          <RangeFilter
            title="Absolute Magnitude"
            max={absoluteMagnitude[1]}
            maxRange={maxMagnitude}
            min={absoluteMagnitude[0]}
            minRange={minMagnitude}
            setValues={(range) => {
              const { min, max } = range;
              setAbsoluteMagnitude([min, max]);
            }}
          />
          <RangeFilter
            title="Minimal estimated diemeter"
            max={estimatedDiameterMinMeters[1]}
            maxRange={maxMinEstimatedDiameter}
            min={estimatedDiameterMinMeters[0]}
            minRange={minMinEstimatedDiameter}
            setValues={(range) => {
              const { min, max } = range;
              setMinEstimatedDiameter([min, max]);
            }}
          />
          <RangeFilter
            title="Maximum estimated diemeter"
            max={estimatedDiameterMaxMeters[1]}
            maxRange={maxMaxEstimatedDiameter}
            min={estimatedDiameterMaxMeters[0]}
            minRange={minMaxEstimatedDiameter}
            setValues={(range) => {
              const { min, max } = range;
              setMaxEstimatedDiameter([min, max]);
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
    backgroundColor: '#2c2c2c',
    width: horizontalScale(200),
    borderRadius: verticalScale(40),
    ...getElevation({
      elevation: 10,
    }),
  },
  filtersApplyText: {
    textAlign: 'center',
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '500',
  },
});
