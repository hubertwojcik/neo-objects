import type { NearEarthObject } from '@/shared/types';
import {
  colors,
  getElevation,
  horizontalScale,
  normalize,
  verticalScale,
} from '@/shared/utils';
import { AntDesign } from '@expo/vector-icons';

import { Skeleton } from 'moti/skeleton';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

import { useOpenDetailAnimation } from './use-open-detail-animation';

type NeoObjectListItemProps = {
  item: NearEarthObject | null;
  onDetailsPress: () => void;
};

const SkeletonCommonProps = {
  colorMode: 'light',
  transition: {
    type: 'timing',
    duration: 1500,
  },
  backgroundColor: '#bababa',
} as const;

const SKELETON_HEIGHT = verticalScale(20);

export const NeoObjectListItem = ({
  item,
  onDetailsPress,
}: NeoObjectListItemProps) => {
  const { animatedHeight, toggleOpen, animatedIconStyles, bodyHeight } =
    useOpenDetailAnimation();

  return (
    <View style={styles.listItemContainer}>
      <Skeleton.Group show={item == null}>
        <TouchableWithoutFeedback disabled={!item} onPress={toggleOpen}>
          <View style={styles.listItemContent}>
            <View style={styles.listItemSkeletonWrapper}>
              <Skeleton
                height={SKELETON_HEIGHT}
                width={'80%'}
                {...SkeletonCommonProps}
              >
                {item && (
                  <Animated.View
                    layout={Layout}
                    entering={FadeIn.duration(1500)}
                  >
                    <Text style={styles.listItemTitle}>{item.name}</Text>
                  </Animated.View>
                )}
              </Skeleton>
            </View>

            {item ? (
              <Animated.View style={animatedIconStyles}>
                <AntDesign name="down" size={24} color={colors.black} />
              </Animated.View>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Skeleton.Group>

      <Animated.View style={[styles.expandedWrapper, animatedHeight]}>
        <View
          style={styles.expandedContainer}
          onLayout={(event) => {
            bodyHeight.value = event.nativeEvent.layout.height;
          }}
        >
          <View style={styles.expandedItemWrapper}>
            <View style={styles.expandedDetailContainer}>
              <Text style={styles.expandedItemTitle}>
                Is potientially hazardous
              </Text>
              <Text>{item?.isPotentiallyHazardousAsteroid ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.expandedDetailContainer}>
              <Text style={styles.expandedItemTitle}>Absolute magnitude</Text>
              <Text>{item?.absoluteMagnitudeH}</Text>
            </View>
            <View style={styles.expandedDetailContainer}>
              <Text style={styles.expandedItemTitle}>
                Minimum Estimated diameter{' '}
              </Text>
              <Text>{item?.estimatedDiameterMinMeters} m</Text>
            </View>

            <View style={styles.expandedDetailContainer}>
              <Text style={styles.expandedItemTitle}>
                Maximum Estimated diameter{' '}
              </Text>
              <Text>{item?.estimatedDiameterMaxMeters} m</Text>
            </View>
          </View>

          <Pressable style={styles.detailsButton} onPress={onDetailsPress}>
            <Text style={styles.buttonText}>Go to details</Text>
            <AntDesign name="arrowright" size={16} color={colors.white} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.white,
    borderRadius: horizontalScale(10),
    ...getElevation({ elevation: 5 }),
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(4),
  },
  listItemSkeletonWrapper: { paddingVertical: verticalScale(10) },
  listItemTitle: {
    color: '#1A1A1A',
    fontWeight: '600',
    fontSize: 16,
  },

  expandedWrapper: {
    overflow: 'hidden',
    ...getElevation({ elevation: 10 }),
  },
  expandedContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: horizontalScale(10),
  },

  expandedItemWrapper: { flex: 1 },
  expandedItemTitle: {
    color: colors.black,
    fontSize: normalize(14),
    fontWeight: '300',
  },

  expandedDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailsButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: horizontalScale(6),
    backgroundColor: '#2c2c2c',
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    borderRadius: verticalScale(16),
    marginVertical: verticalScale(16),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
