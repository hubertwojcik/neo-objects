import type { NearEarthObject } from '@/api/neo-objects';
import {
  colors,
  getElevation,
  horizontalScale,
  verticalScale,
} from '@/shared/utils';
import { AntDesign } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';
import React, { useReducer } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const [isOpen, setOpen] = useReducer((val) => !val, false);

  const animatedHeightValue = useSharedValue(0);
  const bodyHeight = useSharedValue(0);

  const toggleOpen = () => {
    setOpen();
    toggleAnimationValue(!isOpen);
  };

  const toggleAnimationValue = (open: boolean) => {
    if (open) {
      animatedHeightValue.value = withTiming(1, {
        duration: 300,
      });
    } else {
      animatedHeightValue.value = withTiming(0, {
        duration: 300,
      });
    }
  };

  const progress = useDerivedValue(() =>
    isOpen ? withTiming(1) : withTiming(0),
  );

  const animatedHeight = useAnimatedStyle(() => {
    const height = interpolate(
      animatedHeightValue.value,
      [0, 1],
      [0, bodyHeight.value * progress.value + 1],
    );

    const marginTop = interpolate(animatedHeightValue.value, [0, 1], [0, 10]);

    return {
      height: height,
      marginTop: marginTop,
    };
  });

  const animatedIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 180}deg` }],
    };
  });

  return (
    <View style={styles.listItemContainer}>
      <Skeleton.Group show={item == null}>
        <TouchableWithoutFeedback onPress={toggleOpen}>
          <View style={styles.listItemContent}>
            <View style={styles.listItemSkeletonWrapper}>
              <Skeleton
                height={SKELETON_HEIGHT}
                width={'80%'}
                {...SkeletonCommonProps}
              >
                {item && <Text style={styles.listItemTitle}>{item.name}</Text>}
              </Skeleton>
            </View>

            {item ? (
              <Animated.View style={animatedIconStyles}>
                <AntDesign name="down" size={24} color={colors.dark} />
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
          <View style={styles.expandedContent}>
            {item?.is_potentially_hazardous_asteroid && (
              <View style={styles.hazardousIconWrapper}>
                <AntDesign name="warning" size={32} color="black" />
              </View>
            )}
            <View style={styles.expandedItemWrapper}>
              <View style={styles.expandedDetailContainer}>
                <Text>Estimated diameter </Text>
                <Text>
                  {item?.estimated_diameter.meters.estimated_diameter_min.toFixed(
                    2,
                  )}
                  -
                  {item?.estimated_diameter.meters.estimated_diameter_max.toFixed(
                    2,
                  )}{' '}
                  m
                </Text>
              </View>
              <View style={styles.expandedDetailContainer}>
                <Text>Miss distance </Text>
                <Text>
                  {Number(
                    item?.close_approach_data[0].miss_distance.kilometers,
                  ).toFixed(2)}{' '}
                  km
                </Text>
              </View>
            </View>
          </View>
          <Button title="Go to details" onPress={onDetailsPress} />
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
    color: colors.dark,
    fontSize: 16,
  },
  hazardousIconWrapper: { marginRight: horizontalScale(10) },
  expandedWrapper: {
    overflow: 'hidden',
    ...getElevation({ elevation: 10 }),
  },
  expandedContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: horizontalScale(10),
  },
  expandedContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandedItemWrapper: { flex: 1 },
  expandedDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collapsableText: {
    fontSize: 12,
    color: colors.dark,
  },
});
