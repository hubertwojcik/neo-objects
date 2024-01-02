import { useGetNeoObjectById } from '@/api/neo-objects';
import {
  Meteorite,
  NeoDetailsHeader,
  NeoObjectDetailsList,
} from '@/components';
import type { NeoObjectsStackParamList } from '@/navigation/neo-objects-navigator';
import { colors } from '@/shared/utils';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NeoObjectDetailsScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'NeoObjectDetails'
>;

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 20;

const SCROLL_MAX_VALUE = 250;
const SCROLL_MIN_VALUE = 0;

const BORDER_TOP_RADIUS = 50;

export const NeoObjectDetails = ({ route }: NeoObjectDetailsScreenProps) => {
  const { id, objectName } = route.params;

  const { data } = useGetNeoObjectById(id);

  const insets = useSafeAreaInsets();

  const neoDetails = data || null;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [SCROLL_MIN_VALUE, SCROLL_MAX_VALUE],
        [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        Extrapolation.CLAMP,
      ),
    };
  });

  const listStyles = useAnimatedStyle(() => {
    return {
      borderTopLeftRadius: interpolate(
        scrollY.value,
        [SCROLL_MIN_VALUE, SCROLL_MAX_VALUE],
        [BORDER_TOP_RADIUS, 0],
        Extrapolation.CLAMP,
      ),
      borderTopRightRadius: interpolate(
        scrollY.value,
        [SCROLL_MIN_VALUE, SCROLL_MAX_VALUE],
        [BORDER_TOP_RADIUS, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  const screenStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, 150],
        [colors.white, colors.black],
      ),
    };
  });

  return (
    <Animated.View
      style={[
        { flex: 1, backgroundColor: colors.white, paddingTop: insets.top },
        screenStyles,
      ]}
    >
      <NeoDetailsHeader title={objectName} scrollValue={scrollY} />
      <Animated.View style={headerStyles}>
        <Meteorite animatedValue={scrollY} />
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={5}
        bounces={false}
        style={[styles.listWrapper, listStyles]}
        onScroll={scrollHandler}
      >
        <NeoObjectDetailsList details={neoDetails} />
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    backgroundColor: colors.black,
    borderTopLeftRadius: BORDER_TOP_RADIUS,
    borderTopRightRadius: BORDER_TOP_RADIUS,
  },
});
