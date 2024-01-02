import { FilterItem } from '../filter-item';
import { Pressable, useWindowDimensions, View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text } from 'react-native';
import * as React from 'react';
import {
  colors,
  getElevation,
  horizontalScale,
  verticalScale,
} from '@/shared/utils';

type HazardousFilterProps = {
  setValue: (val?: boolean) => void;
  value?: boolean;
};

const HAZARDOUS_OPTIONS = [
  { id: 0, value: undefined, name: 'all' },
  { id: 1, value: true, name: 'yes' },
  { id: 2, value: false, name: 'no' },
];

const FILTER_ITEM_HEIGHT = verticalScale(40);
const ANIMATION_DAMPING = 12;
const SCREEN_PADDING_HORIZONTAL = horizontalScale(10);

export const HazardousFilter = ({ setValue, value }: HazardousFilterProps) => {
  const { width } = useWindowDimensions();
  const ITEM_SIZE =
    (width - SCREEN_PADDING_HORIZONTAL * 2) / HAZARDOUS_OPTIONS.length;

  const indicatorInitialPosition = React.useMemo(
    () => (value === undefined ? 0 : value ? ITEM_SIZE : 2 * ITEM_SIZE),
    [value],
  );

  const hazardousPosition = useSharedValue(indicatorInitialPosition);

  const reanimaetdStyles = useAnimatedStyle(() => {
    return {
      left: hazardousPosition.value,
    };
  });

  React.useEffect(() => {
    if (value === undefined) {
      hazardousPosition.value = withSpring(0, {
        damping: ANIMATION_DAMPING,
      });
    } else if (value) {
      hazardousPosition.value = withSpring(ITEM_SIZE, {
        damping: ANIMATION_DAMPING,
      });
    } else {
      hazardousPosition.value = withSpring(2 * ITEM_SIZE, {
        damping: ANIMATION_DAMPING,
      });
    }
  }, [value]);

  const onResetHazardousFilter = () => {
    setValue(undefined);
    hazardousPosition.value = withSpring(0);
  };

  return (
    <FilterItem
      title="Potientially hazardous"
      canReset
      onResetPress={onResetHazardousFilter}
    >
      <View style={styles.filterContainer}>
        <Animated.View
          style={[
            styles.activeFilterIndicator,
            {
              width: ITEM_SIZE,
            },
            reanimaetdStyles,
          ]}
        />
        {HAZARDOUS_OPTIONS.map((i) => (
          <Pressable
            key={i.id}
            onPress={() => setValue(i.value)}
            style={{
              width: ITEM_SIZE,
            }}
          >
            <Text style={styles.filterName}>{i.name.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>
    </FilterItem>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: FILTER_ITEM_HEIGHT,
    paddingVertical: verticalScale(10),
    position: 'relative',
    height: FILTER_ITEM_HEIGHT,
    ...getElevation({
      elevation: 2,
    }),
  },
  activeFilterIndicator: {
    position: 'absolute',
    height: FILTER_ITEM_HEIGHT,
    backgroundColor: colors.accent,
    borderRadius: FILTER_ITEM_HEIGHT,
  },
  filterName: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
