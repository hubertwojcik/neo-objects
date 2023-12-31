import { View, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  colors,
  horizontalScale,
  normalize,
  verticalScale,
} from '@/shared/utils';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';

type NeoDetailsHeaderProps = {
  title: string;
  scrollValue: SharedValue<number>;
};

const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

const MAX_SCROLL_VALUE = 150;
const MIN_SCROLL_VALUE = 0;

export const NeoDetailsHeader = ({
  title,
  scrollValue,
}: NeoDetailsHeaderProps) => {
  const headerTitleStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollValue.value,
        [MIN_SCROLL_VALUE, MAX_SCROLL_VALUE],
        [colors.black, colors.white],
      ),
    };
  });

  const animatedProps = useAnimatedProps(() => {
    const color = interpolateColor(
      scrollValue.value,
      [MIN_SCROLL_VALUE, MAX_SCROLL_VALUE],
      [colors.black, colors.white],
    );
    return { color };
  });

  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Pressable
        style={styles.backArrowContainer}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AnimatedIcon
          name="arrowleft"
          size={verticalScale(32)}
          animatedProps={animatedProps}
        />
      </Pressable>
      <Animated.Text style={[styles.headerTitle, headerTitleStyles]}>
        {title}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: horizontalScale(10),
  },
  backArrowContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 20,
  },
  headerTitle: {
    textAlign: 'center',
    flex: 1,
    fontSize: normalize(24),
    fontFamily: 'Poppins-SemiBold',
  },
});
