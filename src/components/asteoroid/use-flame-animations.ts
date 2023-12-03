import { useEffect } from 'react';
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const useFlameAnimations = () => {
  const firstFlameWidth = useSharedValue(200);
  const secondFlameWidth = useSharedValue(175);
  const thirdFlameWidth = useSharedValue(120);

  useEffect(() => {
    // Animacja dla długości ogonów
    firstFlameWidth.value = withRepeat(
      withSequence(
        withTiming(220, { duration: 1000 }),
        withTiming(170, { duration: 1000 }),
      ),
      -1,
      true,
    );

    secondFlameWidth.value = withRepeat(
      withSequence(
        withTiming(250, { duration: 1000 }),
        withTiming(175, { duration: 1000 }),
      ),
      -1,
      true,
    );
    thirdFlameWidth.value = withRepeat(
      withSequence(
        withTiming(150, { duration: 1000 }),
        withTiming(120, { duration: 1000 }),
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
