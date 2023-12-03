import { useReducer } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import React from 'react';
import type { NearEarthObject } from '@/api/neo-objects';

type NeoObjectListItemProps = {
  item: NearEarthObject;
};

export const NeoObjectListItem = ({ item }: NeoObjectListItemProps) => {
  const [isOpen, setOpen] = useReducer((val) => !val, false);
  const animatedHeightValue = useSharedValue(0);
  const bodyHeight = useSharedValue(0);

  const toggleOpen = () => {
    toggleAnimationValue(!isOpen);
    setOpen();
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
    isOpen ? withSpring(1) : withTiming(0),
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
  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <Text>{item.name}</Text>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bodyContainer, animatedHeight]}>
        <View
          style={styles.body}
          onLayout={(event) => {
            bodyHeight.value = event.nativeEvent.layout.height;
          }}
        >
          <Text style={styles.collapsableText}>qweqw</Text>
          <Text style={styles.collapsableText}>qweqw</Text>
          <Text style={styles.collapsableText}>qweqw</Text>
          <Text style={styles.collapsableText}>qweqw</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 8,
    borderRadius: 5,
  },
  bodyContainer: {
    overflow: 'hidden',
  },
  body: {
    position: 'absolute',
    width: '100%',
  },
  colText: {
    fontSize: 12,
  },
  smallCol: {
    flex: 1,
  },
  mediumCol: {
    flex: 2,
  },
  largeCol: {
    flex: 7,
  },
  collapsableText: {
    fontSize: 12,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
