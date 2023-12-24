import { normalize, verticalScale } from '@/shared/utils';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type FilterItemWithResetProps = {
  canReset: true;
  onResetPress: () => void;
};

type FilterItemProps = {
  title: string;
  children: React.ReactNode;
} & FilterItemWithResetProps;

export const FilterItem = ({
  title,
  canReset,
  onResetPress,
  children,
}: FilterItemProps) => (
  <View style={styles.container}>
    <View style={styles.filterItemHeader}>
      <Text style={styles.filterItemName}>{title}</Text>
      {canReset && (
        <Pressable onPress={onResetPress}>
          <Text style={styles.resetText}>Clear</Text>
        </Pressable>
      )}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: verticalScale(24) },
  filterItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  filterItemName: {
    flex: 1,
    fontSize: normalize(18),
    fontWeight: '700',
  },
  resetText: { color: 'red', fontWeight: '400' },
});
