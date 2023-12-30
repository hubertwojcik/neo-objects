import { Circle, Group, Mask, Rect } from '@shopify/react-native-skia';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';

export const Earth = () => {
  const { width } = useWindowDimensions();

  const centerX = width / 2;
  const centerY = 200;

  const EARTH_CIRCLE_RADIUS = 100;
  const EARTH_BORDER_CIRCLE_RADIUS = 105;

  const AFRICA_BOTTOM_WIDTH = 60;
  const AFRICA_BOTTOM_X_OFFSET = 10;
  const AFRICA_BOTTOM_Y_OFFSET = 60;
  const AFRICA_BOTTOM_HEIGHT = 20;

  const AFRICA_GREEN_BOTTOM_WIDTH = 50;
  const AFRICA_GREEN_BOTTOM_HEIGHT = 20;
  const AFRICA_GREEN_BOTTOM_X_OFFSET = centerX - 5;
  const AFRICA_GREEN_BOTTOM_Y_OFFSET = centerY + 55;

  const AFRICA_MIDDLE_BOTTOM_WIDTH = 80;
  const AFRICA_MIDDLE_BOTTOM_Y_OFFSET = 20;
  const AFRICA_MIDDLE_BOTTOM_HEIGHT = 40;
  const AFRICA_MIDDLE_BOTTOM_X_OFFSET = 20;

  const AFRICA_GREEN_MIDDLE_BOTTOM_WIDTH = 70;
  const AFRICA_GREEN_MIDDLE_BOTTOM_HEIGHT = 40;
  const AFRICA_GREEN_MIDDLE_BOTTOM_Y_OFFSET = centerY + 15;
  const AFRICA_GREEN_MIDDLE_BOTTOM_X_OFFSET = centerX - 15;

  const AFRICA_TOP_WIDTH = 100;
  const AFRICA_TOP_HEIGHT = 30;
  const AFRICA_TOP_Y_OFFSET = 50;

  const AFRICA_GREEN_TOP_WIDTH = 140;
  const AFRICA_GREEN_TOP_HEIGHT = 30;
  const AFRICA_GREEN_TOP_Y_OFFSET = centerY - 15;
  const AFRICA_GREEN_TOP_X_OFFSET = centerX - 70;

  const AFRICA_MIDDLE_TOP_WIDTH = 150;
  const AFRICA_MIDDLE_TOP_HEIGHT = 40;
  const AFRICA_MIDDLE_TOP_X_OFFSET = 75;
  const AFRICA_MIDDLE_TOP_Y_OFFSET = 20;

  const AFRICA_GREEN_MIDDLE_TOP_WIDTH = 90;
  const AFRICA_GREEN_MIDDLE_TOP_HEIGHT = 30;
  const AFRICA_GREEN_MIDDLE_TOP_X_OFFSET = centerX - 45;
  const AFRICA_GREEN_MIDDLE_TOP_Y_OFFSET = centerY - 45;

  const EUROPE_WIDTH = 110;
  const EUROPE_HEIGHT = 20;
  const EUROPE_X_OFFSET = centerX - 50;
  const EUROPE_Y_OFFSET = centerY - 80;

  const EUROPE_GREEN_WIDTH = 120;
  const EUROPE_GREEN_HEIGHT = 10;
  const EUROPE_GREEN_X_OFFSET = centerX - 45;
  const EUROPE_GREEN_Y_OFFSET = centerY - 75;

  const ASIA_WIDTH = 45;
  const ASIA_HEIGHT = 55;
  const ASIA_X_OFFSET = centerX + 55;
  const ASIA_Y_OFFSET = centerY - 80;

  const ASIA_GREEN_WIDTH = 35;
  const ASIA_GREEN_HEIGHT = 40;
  const ASIA_GREEN_X_OFFSET = centerX + 55;
  const ASIA_GREEN_Y_OFFSET = centerY - 65;

  const NORTH_POLE_WIDTH = 100;
  const NORTH_POLE_HEIGHT = 20;
  const NORTH_POLE_X_OFFSET = centerX - 50;
  const NORTH_POLE_Y_OFFSET = centerY - 110;

  const NORTH_POLE_WHITE_WIDTH = 100;
  const NORTH_POLE_WHITE_HEIGHT = 15;
  const NORTH_POLE_WHITE_X_OFFSET = centerX - 50;
  const NORTH_POLE_WHITE_Y_OFFSET = centerY - 110;

  const SOUTH_POLE_WIDTH = 100;
  const SOUTH_POLE_HEIGHT = 20;
  const SOUTH_POLE_X_OFFSET = centerX - 50;
  const SOUTH_POLE_Y_OFFSET = centerY + 90;

  const SOUTH_POLE_WHITE_WIDTH = 100;
  const SOUTH_POLE_WHITE_HEIGHT = 20;
  const SOUTH_POLE_WHITE_X_OFFSET = centerX - 50;
  const SOUTH_POLE_WHITE_Y_OFFSET = centerY + 95;

  return (
    // <Canvas>
    <Mask
      mask={
        <Circle
          cx={centerX}
          cy={centerY}
          r={EARTH_BORDER_CIRCLE_RADIUS}
          color="black"
        />
      }
    >
      <Group>
        <Circle
          cx={centerX}
          cy={centerY}
          r={EARTH_CIRCLE_RADIUS}
          color="#82d3f7"
        />

        {/* AFRIVCA */}
        {/* AFRICA BOTTOM PART */}
        <Rect
          x={centerX - AFRICA_BOTTOM_X_OFFSET}
          y={centerY + AFRICA_BOTTOM_Y_OFFSET}
          height={AFRICA_BOTTOM_HEIGHT}
          width={AFRICA_BOTTOM_WIDTH}
        />
        {/* AFRICA MIDDLE BOTTOM */}
        <Rect
          x={centerX - AFRICA_MIDDLE_BOTTOM_X_OFFSET}
          y={centerY + AFRICA_MIDDLE_BOTTOM_Y_OFFSET}
          height={AFRICA_MIDDLE_BOTTOM_HEIGHT}
          width={AFRICA_MIDDLE_BOTTOM_WIDTH}
        />
        {/* AFRICA MIDDLE TOP */}
        <Rect
          x={centerX - AFRICA_MIDDLE_TOP_X_OFFSET}
          y={centerY - AFRICA_MIDDLE_TOP_Y_OFFSET}
          height={AFRICA_MIDDLE_TOP_HEIGHT}
          width={AFRICA_MIDDLE_TOP_WIDTH}
        />
        {/* AFRICA TOP */}
        <Rect
          x={centerX - AFRICA_TOP_WIDTH / 2}
          y={centerY - AFRICA_TOP_Y_OFFSET}
          height={AFRICA_TOP_HEIGHT}
          width={AFRICA_TOP_WIDTH}
        />
        <Rect
          x={AFRICA_GREEN_BOTTOM_X_OFFSET}
          y={AFRICA_GREEN_BOTTOM_Y_OFFSET}
          height={AFRICA_GREEN_BOTTOM_HEIGHT}
          width={AFRICA_GREEN_BOTTOM_WIDTH}
          color="green"
        />
        <Rect
          x={AFRICA_GREEN_MIDDLE_BOTTOM_X_OFFSET}
          y={AFRICA_GREEN_MIDDLE_BOTTOM_Y_OFFSET}
          height={AFRICA_GREEN_MIDDLE_BOTTOM_HEIGHT}
          width={AFRICA_GREEN_MIDDLE_BOTTOM_WIDTH}
          color="green"
        />
        <Rect
          x={AFRICA_GREEN_TOP_X_OFFSET}
          y={AFRICA_GREEN_TOP_Y_OFFSET}
          height={AFRICA_GREEN_TOP_HEIGHT}
          width={AFRICA_GREEN_TOP_WIDTH}
          color="green"
        />
        <Rect
          x={AFRICA_GREEN_MIDDLE_TOP_X_OFFSET}
          y={AFRICA_GREEN_MIDDLE_TOP_Y_OFFSET}
          height={AFRICA_GREEN_MIDDLE_TOP_HEIGHT}
          width={AFRICA_GREEN_MIDDLE_TOP_WIDTH}
          color="green"
        />

        {/* EUROPE */}
        <Rect
          x={EUROPE_X_OFFSET}
          y={EUROPE_Y_OFFSET}
          height={EUROPE_HEIGHT}
          width={EUROPE_WIDTH}
        />
        <Rect
          x={ASIA_X_OFFSET}
          y={ASIA_Y_OFFSET}
          height={ASIA_HEIGHT}
          width={ASIA_WIDTH}
        />
        <Rect
          x={EUROPE_GREEN_X_OFFSET}
          y={EUROPE_GREEN_Y_OFFSET}
          height={EUROPE_GREEN_HEIGHT}
          width={EUROPE_GREEN_WIDTH}
          color="green"
        />
        <Rect
          x={ASIA_GREEN_X_OFFSET}
          y={ASIA_GREEN_Y_OFFSET}
          height={ASIA_GREEN_WIDTH}
          width={ASIA_GREEN_HEIGHT}
          color="green"
        />
        {/* NORTH POLE */}
        <Rect
          x={NORTH_POLE_X_OFFSET}
          y={NORTH_POLE_Y_OFFSET}
          height={NORTH_POLE_HEIGHT}
          width={NORTH_POLE_WIDTH}
        />
        <Rect
          x={NORTH_POLE_WHITE_X_OFFSET}
          y={NORTH_POLE_WHITE_Y_OFFSET}
          height={NORTH_POLE_WHITE_HEIGHT}
          width={NORTH_POLE_WHITE_WIDTH}
          color="white"
        />
        {/* SOUTH POLE */}
        <Rect
          x={SOUTH_POLE_X_OFFSET}
          y={SOUTH_POLE_Y_OFFSET}
          height={SOUTH_POLE_HEIGHT}
          width={SOUTH_POLE_WIDTH}
        />
        <Rect
          x={SOUTH_POLE_WHITE_X_OFFSET}
          y={SOUTH_POLE_WHITE_Y_OFFSET}
          height={SOUTH_POLE_WHITE_HEIGHT}
          width={SOUTH_POLE_WHITE_WIDTH}
          color="white"
        />

        <Circle
          cx={centerX}
          cy={centerY}
          r={105}
          style="stroke"
          strokeWidth={10}
        />
      </Group>
    </Mask>
    // </Canvas>
  );
};
