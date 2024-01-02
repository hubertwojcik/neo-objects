import {
  Canvas,
  Circle,
  CornerPathEffect,
  DiscretePathEffect,
  Group,
  rect,
  Rect,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import React from 'react';
import { useWindowDimensions } from 'react-native';

const METEORITE_HEIGHT = 150;
const METEORITE_WIDTH = 300;

const ROTATION_ANGLE_MAX = 10;
const PERSPECTIVE = 300;

const ANIMATION_OPACITY_START = 0;
const ANIMATION_OPACITY_END = 175;
const OPACITY_MAX = 1;
const OPACITY_MIN = 0;

type MeteoriteProps = {
  animatedValue: SharedValue<number>;
};

export const Meteorite = ({ animatedValue }: MeteoriteProps) => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      rotateX.value = withTiming(
        interpolate(
          event.y,
          [0, METEORITE_HEIGHT],
          [ROTATION_ANGLE_MAX, -ROTATION_ANGLE_MAX],
          Extrapolate.CLAMP,
        ),
      );
      rotateY.value = withTiming(
        interpolate(
          event.x,
          [0, METEORITE_WIDTH],
          [-ROTATION_ANGLE_MAX, ROTATION_ANGLE_MAX],
          Extrapolate.CLAMP,
        ),
      );
    })
    .onUpdate((event) => {
      rotateX.value = interpolate(
        event.y,
        [0, METEORITE_HEIGHT],
        [ROTATION_ANGLE_MAX, -ROTATION_ANGLE_MAX],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, METEORITE_WIDTH],
        [-ROTATION_ANGLE_MAX, ROTATION_ANGLE_MAX],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const meteoriteAnimatedStyles = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;

    return {
      transform: [
        {
          perspective: PERSPECTIVE,
        },
        { rotateX: rotateXvalue },
        { rotateY: rotateYvalue },
      ],
      opacity: interpolate(
        animatedValue.value,
        [ANIMATION_OPACITY_START, ANIMATION_OPACITY_END],
        [OPACITY_MAX, OPACITY_MIN],
      ),
    };
  }, []);

  const { width } = useWindowDimensions();

  const meteorite = rect(50, 50, METEORITE_WIDTH, METEORITE_HEIGHT);

  const clip = Skia.Path.Make();
  clip.addOval(meteorite);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={meteoriteAnimatedStyles}>
        <Canvas style={{ width, height: 300 }}>
          <Group clip={clip}>
            <Rect
              rect={rect(50, 50, 300, METEORITE_HEIGHT)}
              color="darkgray"
              origin={meteorite}
            >
              <CornerPathEffect r={60} />
              <DiscretePathEffect length={40} deviation={40} />
            </Rect>
            <Circle r={30} c={vec(300, 50)} color="grey" />
            <Circle r={20} c={vec(100, 100)} color="grey" />
            <Circle r={15} c={vec(200, 150)} color="grey" />
            <Circle r={30} c={vec(310, 170)} color="grey" />
          </Group>
        </Canvas>
      </Animated.View>
    </GestureDetector>
  );
};
