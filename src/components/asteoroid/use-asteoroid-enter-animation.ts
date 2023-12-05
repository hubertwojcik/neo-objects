import { moderateScale } from '@/shared/utils';
import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const useAsteoroidEnterAnimation = () => {
  const positionX = useSharedValue(moderateScale(300));
  const positionY = useSharedValue(-moderateScale(300));

  useEffect(() => {
    positionX.value = withSpring(0, {
      velocity: 100,
    });
    positionY.value = withSpring(0, {
      velocity: 100,
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
