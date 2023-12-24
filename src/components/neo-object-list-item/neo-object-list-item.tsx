import type { NearEarthObject } from '@/shared/types';
import { colors, verticalScale } from '@/shared/utils';
import { AntDesign } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { styles } from './styles';
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
                  {item?.estimated_diameter?.meters.estimated_diameter_min.toFixed(
                    2,
                  )}
                  -
                  {item?.estimated_diameter?.meters.estimated_diameter_max.toFixed(
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
