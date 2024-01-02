import { useEffect } from 'react';
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const INITIAL_FIRST_FLAME_WIDTH = 200;
const INITIAL_SECOND_FLAME_WIDTH = 175;
const INITIAL_THIRD_FLAME_WIDTH = 120;
const FIRST_FLAME_MAX_WIDTH = 220;
const FIRST_FLAME_MIN_WIDTH = 170;
const SECOND_FLAME_MAX_WIDTH = 250;
const SECOND_FLAME_MIN_WIDTH = 175;
const THIRD_FLAME_MAX_WIDTH = 150;
const THIRD_FLAME_MIN_WIDTH = 120;
const ANIMATION_DURATION = 1000;

export const useFlameAnimations = () => {
  const firstFlameWidth = useSharedValue(INITIAL_FIRST_FLAME_WIDTH);
  const secondFlameWidth = useSharedValue(INITIAL_SECOND_FLAME_WIDTH);
  const thirdFlameWidth = useSharedValue(INITIAL_THIRD_FLAME_WIDTH);

  useEffect(() => {
    firstFlameWidth.value = withRepeat(
      withSequence(
        withTiming(FIRST_FLAME_MAX_WIDTH, { duration: ANIMATION_DURATION }),
        withTiming(FIRST_FLAME_MIN_WIDTH, { duration: ANIMATION_DURATION }),
      ),
      -1,
      true,
    );

    secondFlameWidth.value = withRepeat(
      withSequence(
        withTiming(SECOND_FLAME_MAX_WIDTH, { duration: ANIMATION_DURATION }),
        withTiming(SECOND_FLAME_MIN_WIDTH, { duration: ANIMATION_DURATION }),
      ),
      -1,
      true,
    );

    thirdFlameWidth.value = withRepeat(
      withSequence(
        withTiming(THIRD_FLAME_MAX_WIDTH, { duration: ANIMATION_DURATION }),
        withTiming(THIRD_FLAME_MIN_WIDTH, { duration: ANIMATION_DURATION }),
      ),
      -1,
      true,
    );
  }, []);

  return {
    firstFlameWidth,
    secondFlameWidth,
    thirdFlameWidth,
  };
};
