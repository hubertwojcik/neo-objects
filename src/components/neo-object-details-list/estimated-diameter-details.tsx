import { SkeletonCommonProps } from '@/shared/constants';
import type { EstimatedDiameter, Nullabe } from '@/shared/types';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SKELETON_HEIGHT = 15;
const SKELETON_WIDTH = 50;

export const EstimatedDiameterDetails = ({
  estimatedDiameter,
}: {
  estimatedDiameter: Nullabe<EstimatedDiameter>;
}) => {
  return (
    <View style={styles.estimatedDetailsContainer}>
      <Text style={styles.estimatedDetailsTitle}>
        Estimated diameter min/max
      </Text>
      <View style={styles.estimatedDetailsContent}>
        <View style={styles.estimatedDetailsColumn}>
          <Text style={styles.estimatedDetailsColumnTitle}>meters</Text>
          <Skeleton
            height={SKELETON_HEIGHT}
            width={SKELETON_WIDTH}
            {...SkeletonCommonProps}
          >
            {estimatedDiameter && (
              <Text style={styles.estimatedDetailsColumnValue}>
                {estimatedDiameter.meters.estimated_diameter_min.toFixed(1)}-
                {estimatedDiameter.meters.estimated_diameter_max.toFixed(1)}
              </Text>
            )}
          </Skeleton>
        </View>
        <View style={styles.estimatedDetailsColumn}>
          <Text style={styles.estimatedDetailsColumnTitle}>kilometers</Text>
          <Skeleton
            height={SKELETON_HEIGHT}
            width={SKELETON_WIDTH}
            {...SkeletonCommonProps}
          >
            {estimatedDiameter && (
              <Text style={styles.estimatedDetailsColumnValue}>
                {estimatedDiameter.kilometers.estimated_diameter_min.toFixed(3)}
                -
                {estimatedDiameter.kilometers.estimated_diameter_max.toFixed(3)}
              </Text>
            )}
          </Skeleton>
        </View>
        <View style={styles.estimatedDetailsColumn}>
          <View>
            <Text style={styles.estimatedDetailsColumnTitle}>feets</Text>
            <Skeleton
              height={SKELETON_HEIGHT}
              width={SKELETON_WIDTH}
              {...SkeletonCommonProps}
            >
              {estimatedDiameter && (
                <Text style={styles.estimatedDetailsColumnValue}>
                  {estimatedDiameter.feet.estimated_diameter_min.toFixed()}-
                  {estimatedDiameter.feet.estimated_diameter_max.toFixed()}
                </Text>
              )}
            </Skeleton>
          </View>
        </View>
        <View style={styles.estimatedDetailsColumn}>
          <View>
            <Text style={styles.estimatedDetailsColumnTitle}>Miles</Text>
            <Skeleton
              height={SKELETON_HEIGHT}
              width={SKELETON_WIDTH}
              {...SkeletonCommonProps}
            >
              {estimatedDiameter && (
                <Text style={styles.estimatedDetailsColumnValue}>
                  {estimatedDiameter.miles.estimated_diameter_min.toFixed(3)}-
                  {estimatedDiameter.miles.estimated_diameter_max.toFixed(3)}
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
  estimatedDetailsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingVertical: 10,
  },
  estimatedDetailsTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  estimatedDetailsContent: { flexDirection: 'row', marginBottom: 5 },
  estimatedDetailsColumn: { flex: 1, alignItems: 'center' },
  estimatedDetailsColumnTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    color: 'white',
    marginBottom: 5,
  },
  estimatedDetailsColumnValue: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
});
