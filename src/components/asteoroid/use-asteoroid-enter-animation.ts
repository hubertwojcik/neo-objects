import { moderateScale } from '@/shared/utils';
import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const INITIAL_POSITION_X = moderateScale(300);
const INITIAL_POSITION_Y = -moderateScale(300);
const FINAL_POSITION = 0;
const SPRING_VELOCITY = 100;

export const useAsteoroidEnterAnimation = () => {
  const positionX = useSharedValue(INITIAL_POSITION_X);
  const positionY = useSharedValue(INITIAL_POSITION_Y);

  useEffect(() => {
    positionX.value = withSpring(FINAL_POSITION, {
      velocity: SPRING_VELOCITY,
    });
    positionY.value = withSpring(FINAL_POSITION, {
      velocity: SPRING_VELOCITY,
    });
  }, []);

  const animatedAsteoroidContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  return {
    animatedAsteoroidContainerStyles,
  };
};
