import { Canvas } from '@shopify/react-native-skia';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import type { Point } from '@/shared/types';
import { Meteorite } from './meteorite';
import { Earth } from './earth';

export const meteorites: { start: Point; end: Point }[] = [
  {
    start: {
      x: 400,
      y: 0,
    },
    end: {
      x: -150,
      y: 600,
    },
  },

  {
    start: {
      x: 200,
      y: -50,
    },
    end: {
      x: -200,
      y: 100,
    },
  },
];

export const EarthWithObject = () => {
  const { width, height } = useWindowDimensions();
  return (
    <Canvas style={{ width, height }}>
      <Earth />
      {meteorites.map((i, idx) => (
        <Meteorite coordinates={i} key={idx} />
      ))}
    </Canvas>
  );
};
