import { SkeletonCommonProps } from '@/shared/constants';
import type { Nullabe, RelativeVelocity } from '@/shared/types';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SKELETON_HEIGHT = 15;
const SKELETON_WIDTH = 50;

export const RelativeVelocityDetails = ({
  relativeVelocity,
}: {
  relativeVelocity: Nullabe<RelativeVelocity>;
}) => {
  return (
    <View style={styles.relativeVelocityDetailsContainer}>
      <Text style={styles.relativeVelocityDetailsTitle}>Relative velocity</Text>
      <View style={styles.relativeVelocityDetailsContent}>
        <View style={styles.relativeVelocityDetailsColumn}>
          <Text style={styles.relativeVelocityDetailsColumnTitle}>km/s</Text>
          <Skeleton
            height={SKELETON_HEIGHT}
            width={SKELETON_WIDTH}
            {...SkeletonCommonProps}
          >
            {relativeVelocity && (
              <Text style={styles.relativeVelocityDetailsColumnValue}>
                {Number(relativeVelocity.kilometers_per_second).toFixed(2)}
              </Text>
            )}
          </Skeleton>
        </View>
        <View style={styles.relativeVelocityDetailsColumn}>
          <Text style={styles.relativeVelocityDetailsColumnTitle}>km/h</Text>
          <Skeleton
            height={SKELETON_HEIGHT}
            width={SKELETON_WIDTH}
            {...SkeletonCommonProps}
          >
            {relativeVelocity && (
              <Text style={styles.relativeVelocityDetailsColumnValue}>
                {Number(relativeVelocity.kilometers_per_hour).toFixed(2)}
              </Text>
            )}
          </Skeleton>
        </View>
        <View style={styles.relativeVelocityDetailsColumn}>
          <View>
            <Text style={styles.relativeVelocityDetailsColumnTitle}>
              miles/h
            </Text>
            <Skeleton
              height={SKELETON_HEIGHT}
              width={SKELETON_WIDTH}
              {...SkeletonCommonProps}
            >
              {relativeVelocity && (
                <Text style={styles.relativeVelocityDetailsColumnValue}>
                  {Number(relativeVelocity.miles_per_hour).toFixed(2)}
                </Text>
              )}
            </Skeleton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  relativeVelocityDetailsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingVertical: 10,
  },
  relativeVelocityDetailsTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  relativeVelocityDetailsContent: { flexDirection: 'row', marginBottom: 5 },
  relativeVelocityDetailsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  relativeVelocityDetailsColumnTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    color: 'white',
    marginBottom: 5,
  },
  relativeVelocityDetailsColumnValue: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
});
