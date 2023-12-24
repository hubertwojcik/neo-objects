import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidlineBaseWidth = 390;
const guidlineBaseHeight = 844;

const widthRatio = width / guidlineBaseWidth;
const heightRatio = height / guidlineBaseHeight;

export const horizontalScale = (size: number) => widthRatio * size;

export const verticalScale = (size: number) => heightRatio * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export const normalize = (size: number, forHeight?: boolean) => {
  const newSize = size * (forHeight ? heightRatio : widthRatio);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
