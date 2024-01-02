import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import { Slider } from '@/ui';
import { FilterItem } from '../filter-item';

type RangeFilterProps = {
  title: string;
  min: number;
  max: number;
  minRange: number;
  maxRange: number;
  setValues: (range: { min: number; max: number }) => void;
};

const STEPS = 20;

export const RangeFilter = ({
  title,
  setValues,
  max,
  min,
  maxRange,
  minRange,
}: RangeFilterProps) => {
  const { width } = useWindowDimensions();
  return (
    <FilterItem
      title={title}
      canReset
      onResetPress={() => setValues({ min: minRange, max: maxRange })}
    >
      <Slider
        max={maxRange}
        maxValue={max}
        min={minRange}
        minValue={min}
        step={Math.floor(maxRange - minRange) / STEPS}
        onValueChange={setValues}
        sliderWidth={width - 40}
      />
    </FilterItem>
  );
};
