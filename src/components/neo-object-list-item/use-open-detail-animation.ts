import { useReducer } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useOpenDetailAnimation = () => {
  const [isOpen, setOpen] = useReducer((val) => !val, false);

  const animatedHeightValue = useSharedValue(0);
  const bodyHeight = useSharedValue(0);

  const toggleOpen = () => {
    setOpen();
    toggleAnimationValue(!isOpen);
  };

  const toggleAnimationValue = (open: boolean) => {
    if (open) {
      animatedHeightValue.value = withTiming(1, {
        duration: 300,
      });
    } else {
      animatedHeightValue.value = withTiming(0, {
        duration: 300,
      });
    }
  };

  const progress = useDerivedValue(() =>
    isOpen ? withTiming(1) : withTiming(0),
  );

  const animatedHeight = useAnimatedStyle(() => {
    const height = interpolate(
      animatedHeightValue.value,
      [0, 1],
      [0, bodyHeight.value * progress.value + 1],
    );

    const marginTop = interpolate(animatedHeightValue.value, [0, 1], [0, 10]);

    return {
      height: height,
      marginTop: marginTop,
    };
  });

  const animatedIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 180}deg` }],
    };
  });

  return {
    toggleOpen,
    animatedHeight,
    animatedIconStyles,
    bodyHeight,
  };
};
