import { FilterItem } from '../filter-item';
import { Pressable, useWindowDimensions, View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text } from 'react-native';
import * as React from 'react';
import { getElevation, verticalScale } from '@/shared/utils';

type HazardousFilterProps = {
  setValue: (val?: boolean) => void;
  value?: boolean;
};

const HAZARDOUS_OPTIONS = [
  { id: 0, val: undefined, name: 'all' },
  { id: 1, val: true, name: 'yes' },
  { id: 2, val: false, name: 'no' },
];

const FILTER_ITEM_HEIGHT = verticalScale(40);
const ANIMATION_DAMPING = 12;
const SCREEN_PADDING_HORIZONTAL = 10;

export const HazardousFilter = ({ setValue, value }: HazardousFilterProps) => {
  const { width } = useWindowDimensions();
  const ITEM_SIZE =
    (width - SCREEN_PADDING_HORIZONTAL * 2) / HAZARDOUS_OPTIONS.length;

  const indicatorInitialPosition = React.useMemo(
    () => (value === undefined ? 0 : value ? ITEM_SIZE : 2 * ITEM_SIZE),
    [],
  );

  const hazardousPosition = useSharedValue(indicatorInitialPosition);

  const reanimaetdStyles = useAnimatedStyle(() => {
    return {
      left: hazardousPosition.value,
    };
  });

  const onResetHazardousFilter = () => {
    setValue(undefined);
    hazardousPosition.value = withSpring(0);
  };

  const onHazardousSelection = (animatedPosition: number, value?: boolean) => {
    setValue(value);
    hazardousPosition.value = withSpring(animatedPosition, {
      damping: ANIMATION_DAMPING,
    });
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
        {HAZARDOUS_OPTIONS.map((i, idx) => (
          <Pressable
            key={i.id}
            onPress={() => onHazardousSelection(ITEM_SIZE * idx, value)}
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
    backgroundColor: 'white',
    borderRadius: FILTER_ITEM_HEIGHT,
    paddingVertical: verticalScale(10),
    position: 'relative',
    height: 40,
    ...getElevation({
      elevation: 2,
    }),
  },
  activeFilterIndicator: {
    position: 'absolute',
    height: FILTER_ITEM_HEIGHT,
    backgroundColor: 'orange',
    borderRadius: FILTER_ITEM_HEIGHT,
  },
  filterName: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
