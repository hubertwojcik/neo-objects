import { useFlameAnimations, useTicking } from '@/core/hooks';
import { moderateScale } from '@/shared/utils';

import {
  Canvas,
  Circle,
  Group,
  RoundedRect,
  useComputedValue,
} from '@shopify/react-native-skia';
import React from 'react';

// Constants for asteroid properties
const ASTEROID_RADIUS = moderateScale(50);
const FLAME_WIDTH_RATIO = 2 / 3;
const FLAME_ROUNDNESS = moderateScale(15);

// Constants for flame positions
const FLAME_X_POSITION = 50 + ASTEROID_RADIUS;
const FLAME_Y_POSITION = moderateScale(100);
const FLAME_OFFSET = (ASTEROID_RADIUS * FLAME_WIDTH_RATIO) / 2;

// Constants for rotation
const ROTATION_DEGREE = -30;
const ASTEROID_ROTATION_MULTIPLIER = 12;
const DEGREE_TO_RADIAN = Math.PI / 180;

// Constants for asteroid details
const DETAIL_RADIUS_1 = moderateScale(10);
const DETAIL_RADIUS_2 = moderateScale(15);
const DETAIL_POSITION_1 = { x: moderateScale(120), y: moderateScale(80) };
const DETAIL_POSITION_2 = { x: moderateScale(80), y: moderateScale(120) };

const ASTEROID_CENTER = moderateScale(100);

export const Asteroid = () => {
  const { firstFlameWidth, secondFlameWidth, thirdFlameWidth } =
    useFlameAnimations();
  const { tickings } = useTicking();

  const asteroidRotation = useComputedValue(() => {
    return [
      { rotate: tickings * ASTEROID_ROTATION_MULTIPLIER * DEGREE_TO_RADIAN },
    ];
  }, [tickings]);

  return (
    <Canvas
      style={{
        transform: [{ rotate: `${ROTATION_DEGREE}deg` }],
        flex: 1,
      }}
    >
      <Group>
        <RoundedRect
          x={FLAME_X_POSITION}
          y={FLAME_Y_POSITION - FLAME_OFFSET}
          width={firstFlameWidth}
          height={ASTEROID_RADIUS * FLAME_WIDTH_RATIO}
          r={FLAME_ROUNDNESS}
          color="#FDB813"
        />
        <RoundedRect
          x={FLAME_X_POSITION}
          y={
            FLAME_Y_POSITION -
            FLAME_OFFSET +
            ASTEROID_RADIUS * FLAME_WIDTH_RATIO
          }
          width={secondFlameWidth}
          height={ASTEROID_RADIUS * FLAME_WIDTH_RATIO}
          r={FLAME_ROUNDNESS}
          color="#F9A602"
        />
        <RoundedRect
          x={FLAME_X_POSITION}
          y={
            FLAME_Y_POSITION -
            FLAME_OFFSET -
            ASTEROID_RADIUS * FLAME_WIDTH_RATIO
          }
          width={thirdFlameWidth}
          height={ASTEROID_RADIUS * FLAME_WIDTH_RATIO}
          r={FLAME_ROUNDNESS}
          color="#F9A602"
        />

        <Group
          origin={{ x: ASTEROID_CENTER, y: ASTEROID_CENTER }}
          transform={asteroidRotation}
        >
          <Circle
            cx={ASTEROID_CENTER}
            cy={ASTEROID_CENTER}
            r={ASTEROID_RADIUS}
            color="#6B0F1A"
          />

          <Circle
            cx={DETAIL_POSITION_1.x}
            cy={DETAIL_POSITION_1.y}
            r={DETAIL_RADIUS_1}
            color="#3B0B0B"
          />
          <Circle
            cx={DETAIL_POSITION_2.x}
            cy={DETAIL_POSITION_2.y}
            r={DETAIL_RADIUS_2}
            color="#3B0B0B"
          />
        </Group>
      </Group>
    </Canvas>
  );
};
