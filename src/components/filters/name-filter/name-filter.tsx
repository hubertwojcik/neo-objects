import { TextInput, StyleSheet } from 'react-native';
import { FilterItem } from '../filter-item';
import * as React from 'react';
import {
  colors,
  getElevation,
  horizontalScale,
  verticalScale,
} from '@/shared/utils';

type NameFilterProps = {
  setValue: (val: string) => void;
  value: string;
};

export const NameFilter = ({ setValue, value }: NameFilterProps) => {
  const onResetNameFilter = () => {
    setValue('');
  };

  return (
    <FilterItem title="Name" canReset onResetPress={onResetNameFilter}>
      <TextInput
        value={value}
        placeholder="NEO name"
        onChangeText={setValue}
        style={styles.textInput}
      />
    </FilterItem>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.white,
    borderRadius: verticalScale(40),
    minHeight: verticalScale(40),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(10),
    ...getElevation({
      elevation: 2,
    }),
  },
});
