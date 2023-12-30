import type { Point } from '@/shared/types';
import { calculateAngleB } from '@/shared/utils';
import {
  Circle,
  CornerPathEffect,
  DiscretePathEffect,
  Group,
} from '@shopify/react-native-skia';
import * as React from 'react';
import { useEffect } from 'react';

import {
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type MeteoriteProps = {
  coordinates: {
    start: Point;
    end: Point;
  };
};

export const Meteorite = ({ coordinates }: MeteoriteProps) => {
  const meteoriteRadius = useSharedValue(10);

  const meteoriteXPosition = useSharedValue(coordinates.start.x);
  const meteoriteYPosition = useSharedValue(coordinates.start.y);

  const meteoriteAngle = calculateAngleB(coordinates.start, coordinates.end, {
    x: coordinates.start.x,
    y: coordinates.end.y,
  });

  const transform = useDerivedValue(() => {
    return [
      { translateX: meteoriteXPosition.value },
      { translateY: meteoriteYPosition.value },
      { rotate: -meteoriteAngle },
    ];
  });

  useEffect(() => {
    meteoriteXPosition.value = withDelay(
      1500,
      withRepeat(
        withTiming(coordinates.end.x, { duration: 5000 }, () => {
          meteoriteRadius.value = Math.random() * (20 - 10) + 10;
        }),
        -1,
      ),
    );
    meteoriteYPosition.value = withDelay(
      1500,
      withRepeat(withTiming(coordinates.end.y, { duration: 5000 }), -1),
    );
  }, []);

  const meteoriteR = useDerivedValue(() => meteoriteRadius.value);

  return (
    <>
      <Group transform={transform}>
        <Circle cx={20} cy={20} r={meteoriteR} color="grey">
          <CornerPathEffect r={10} />

          <DiscretePathEffect deviation={2} length={2} />
        </Circle>
        <Circle cx={20} cy={18} r={2} color="black" />
      </Group>
    </>
  );
};
