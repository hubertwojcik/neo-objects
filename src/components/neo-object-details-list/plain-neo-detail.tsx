import { SkeletonCommonProps } from '@/shared/constants';
import type { Nullabe } from '@/shared/types';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SKELETON_HEIGHT = 18;
const SKELETON_WIDTH = 100;

export const PlainNeoDetail = ({
  detail,
  name,
}: {
  detail: Nullabe<string>;
  name: string;
}) => {
  return (
    <View style={styles.PlainNeoDetailsContainer}>
      <Text style={styles.PlainNeoDetailsTitle}>{name}</Text>
      <View style={{ paddingVertical: 4 }}>
        <Skeleton
          height={SKELETON_HEIGHT}
          width={SKELETON_WIDTH}
          {...SkeletonCommonProps}
        >
          <Text style={styles.PlainNeoDetailsValue}>{detail}</Text>
        </Skeleton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PlainNeoDetailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingVertical: 10,
  },
  PlainNeoDetailsTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  PlainNeoDetailsValue: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    color: 'white',
  },
});
