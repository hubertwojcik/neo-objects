import * as React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';

type SliderProps = {
  sliderWidth: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (range: { min: number; max: number }) => void;
};

type ContextType = {
  startX: number;
  translateY: number;
};

export const Slider = ({
  sliderWidth,
  min,
  max,
  step,
  onValueChange,
}: SliderProps) => {
  const minValuePosition = useSharedValue(0);
  const maxValuePosition = useSharedValue(sliderWidth);
  const opacity = useSharedValue(0);

  const minValuePanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, ctx) => {
      ctx.startX = minValuePosition.value;
    },
    onActive: (e, ctx) => {
      if (ctx.startX + e.translationX < 0) {
        minValuePosition.value = 0;
      } else if (ctx.startX + e.translationX > maxValuePosition.value) {
        minValuePosition.value = maxValuePosition.value;
      } else {
        minValuePosition.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      opacity.value = 0;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(
            minValuePosition.value / (sliderWidth / ((max - min) / step)),
          ) *
            step,
        max:
          min +
          Math.floor(
            maxValuePosition.value / (sliderWidth / ((max - min) / step)),
          ) *
            step,
      });
    },
  });

  const maxValuePanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, ctx) => {
      ctx.startX = maxValuePosition.value;
    },
    onActive: (e, ctx) => {
      if (ctx.startX + e.translationX > sliderWidth) {
        maxValuePosition.value = sliderWidth;
      } else if (ctx.startX + e.translationX < minValuePosition.value) {
        maxValuePosition.value = minValuePosition.value;
      } else {
        maxValuePosition.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(
            minValuePosition.value / (sliderWidth / ((max - min) / step)),
          ) *
            step,
        max:
          min +
          Math.floor(
            maxValuePosition.value / (sliderWidth / ((max - min) / step)),
          ) *
            step,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: minValuePosition.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: maxValuePosition.value }],
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: minValuePosition.value }],
    width: maxValuePosition.value - minValuePosition.value,
  }));

  return (
    <View style={[styles.sliderContainer, { width: sliderWidth }]}>
      <View style={[styles.sliderBack, { width: sliderWidth }]} />
      <Animated.View style={[sliderStyle, styles.sliderFront]} />
      <PanGestureHandler onGestureEvent={minValuePanGestureEvent}>
        <Animated.View style={[animatedStyle, styles.thumb]} />
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={maxValuePanGestureEvent}>
        <Animated.View style={[animatedStyle2, styles.thumb]} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'blue',
  },
  sliderBack: {
    height: 8,
    backgroundColor: '#DFEAFB',
    borderRadius: 20,
  },
  sliderFront: {
    height: 8,
    backgroundColor: '#3F4CF6',
    borderRadius: 20,
    position: 'absolute',
  },
  thumb: {
    left: -10,
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#3F4CF6',
    borderWidth: 5,
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    top: -40,
    bottom: 20,
    backgroundColor: 'black',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%',
  },
});
