import * as React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import {
  getElevation,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/shared/utils';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type SliderProps = {
  sliderWidth: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (range: { min: number; max: number }) => void;
  maxValue: number;
  minValue: number;
};

const THUMB_SIZE = moderateScale(20);
const THUMB_RADIUS = THUMB_SIZE / 2;
const SLIDER_HEIGHT = verticalScale(8);
const SLIDER_RADIUS = verticalScale(20);
const VALUE_BOX_WIDTH = horizontalScale(40);
const VALUE_BOX_OFFSET = horizontalScale(-10);
const VALUE_BOX_PADDING_VERTICAL = verticalScale(2);
const VALUE_BOX_MARGIN_TOP = verticalScale(10);

export const Slider = ({
  sliderWidth,
  min,
  max,
  step,
  onValueChange,
  maxValue,
  minValue,
}: SliderProps) => {
  const minXTranslation = useSharedValue(0);
  const maxXTranslation = useSharedValue(sliderWidth);
  const activeElement = useSharedValue<'max' | 'min'>('min');

  const context = useSharedValue({
    x: 0,
  });

  useEffect(() => {
    if (minValue !== min) {
      if (minValue > min) {
        minXTranslation.value = Math.ceil(
          ((minValue - min) * sliderWidth) / (max - min),
        );
      } else {
        minXTranslation.value = Math.ceil(
          ((min - minValue) * sliderWidth) / (max - min),
        );
      }
    } else {
      minXTranslation.value = withTiming(0);
    }

    if (max !== maxValue) {
      maxXTranslation.value = Math.ceil(
        sliderWidth - ((max - maxValue) * sliderWidth) / (max - min),
      );
    } else {
      maxXTranslation.value = withTiming(sliderWidth);
    }
  }, [minValue, maxValue, max, min]);

  const minGesturePan = Gesture.Pan()
    .onStart(() => {
      context.value = { x: minXTranslation.value };
      activeElement.value = 'min';
    })
    .onUpdate((e) => {
      if (context.value.x + e.translationX < 0) {
        minXTranslation.value = 0;
      } else if (context.value.x + e.translationX > maxXTranslation.value) {
        minXTranslation.value = maxXTranslation.value;
      } else {
        minXTranslation.value = context.value.x + e.translationX;
      }
    })
    .onEnd(() => {
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(
            minXTranslation.value / (sliderWidth / ((max - min) / step)),
          ) *
            step,
        max: maxValue,
      });
      context.value = { x: 0 };
    });

  const maxGesturePan = Gesture.Pan()
    .onStart(() => {
      activeElement.value = 'max';
      context.value = { x: maxXTranslation.value };
    })
    .onUpdate((e) => {
      if (context.value.x + e.translationX > sliderWidth) {
        maxXTranslation.value = sliderWidth;
      } else if (context.value.x + e.translationX < minXTranslation.value) {
        maxXTranslation.value = minXTranslation.value;
      } else {
        maxXTranslation.value = context.value.x + e.translationX;
      }
    })
    .onEnd(() => {
      runOnJS(onValueChange)({
        min: minValue,
        max:
          min +
          Math.floor(
            maxXTranslation.value / (sliderWidth / ((max - min) / step)),
          ) *
            step,
      });

      context.value = { x: 0 };
    });

  const reanimatedMinValueStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: minXTranslation.value }],
    zIndex: activeElement.value === 'min' ? 1 : 0,
  }));

  const reanimatedMaxValueStyles = useAnimatedStyle(() => ({
    zIndex: activeElement.value === 'max' ? 1 : 0,
    transform: [{ translateX: maxXTranslation.value }],
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: minXTranslation.value }],
    width: maxXTranslation.value - minXTranslation.value,
  }));

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const minLabelText = useAnimatedProps(() => {
    return {
      text: `${
        min +
        Math.floor(
          minXTranslation.value / (sliderWidth / ((max - min) / step)),
        ) *
          step
      }`,
      defaultValue: `${
        min +
        Math.floor(
          minXTranslation.value / (sliderWidth / ((max - min) / step)),
        ) *
          step
      }`,
    };
  });
  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `${
        min +
        Math.floor(
          maxXTranslation.value / (sliderWidth / ((max - min) / step)),
        ) *
          step
      }`,
      defaultValue: `${
        min +
        Math.floor(
          maxXTranslation.value / (sliderWidth / ((max - min) / step)),
        ) *
          step
      }`,
    };
  });

  return (
    <View style={{ marginBottom: verticalScale(12) }}>
      <View style={[styles.sliderContainer, { width: sliderWidth }]}>
        <View style={[styles.sliderBackground, { width: sliderWidth }]} />
        <Animated.View style={[styles.sliderRange, sliderStyle]} />
        <GestureDetector gesture={minGesturePan}>
          <Animated.View style={[reanimatedMinValueStyles, styles.thumb]} />
        </GestureDetector>

        <GestureDetector gesture={maxGesturePan}>
          <Animated.View style={[reanimatedMaxValueStyles, styles.thumb]} />
        </GestureDetector>
      </View>
      <View style={styles.sliderValuesWrapper}>
        <Animated.View
          style={[styles.minValueContent, reanimatedMinValueStyles]}
        >
          <AnimatedTextInput
            animatedProps={minLabelText}
            style={styles.valueText}
            value={minValue.toString()}
          />
        </Animated.View>
        <Animated.View
          style={[styles.maxValueContent, reanimatedMaxValueStyles]}
        >
          <AnimatedTextInput
            animatedProps={maxLabelText}
            style={styles.valueText}
            value={maxValue.toString()}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sliderBackground: {
    height: SLIDER_HEIGHT,
    backgroundColor: '#DFEAFB',
    borderRadius: SLIDER_RADIUS,
  },
  sliderRange: {
    height: SLIDER_HEIGHT,
    backgroundColor: '#FFBB3B',
    borderRadius: SLIDER_RADIUS,
    position: 'absolute',
  },
  thumb: {
    left: -THUMB_RADIUS,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#FFBB3B',
    borderWidth: 1,
    borderRadius: THUMB_RADIUS,
    ...getElevation({ elevation: 5 }),
  },
  sliderValuesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minValueContent: {
    position: 'absolute',
    marginTop: VALUE_BOX_MARGIN_TOP,
    width: VALUE_BOX_WIDTH,
    left: VALUE_BOX_OFFSET,
    borderRadius: 4,
    paddingVertical: VALUE_BOX_PADDING_VERTICAL,

    ...getElevation({ elevation: 5 }),
  },
  maxValueContent: {
    position: 'absolute',
    marginTop: VALUE_BOX_MARGIN_TOP,
    width: VALUE_BOX_WIDTH,
    left: VALUE_BOX_OFFSET,
    borderRadius: 4,
    paddingVertical: VALUE_BOX_PADDING_VERTICAL,

    ...getElevation({ elevation: 5 }),
  },
  valueText: { textAlign: 'center', fontWeight: '500' },
});
