import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NeoObjectsStackParamList } from '@/navigation/neo-objects-navigator';
import {
  Canvas,
  CornerPathEffect,
  DiscretePathEffect,
  rect,
  Circle,
  vec,
  Group,
  Skia,
  Rect,
} from '@shopify/react-native-skia';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type NeoObjectDetailsScreenProps = NativeStackScreenProps<
  NeoObjectsStackParamList,
  'NeoObjectDetails'
>;

const METEORITE_HEIGHT = 150;
const METEORITE_WIDTH = 300;

export const NeoObjectDetails = ({
  navigation,
}: NeoObjectDetailsScreenProps) => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      rotateX.value = withTiming(
        interpolate(
          event.y,
          [0, METEORITE_HEIGHT],
          [10, -10],
          Extrapolate.CLAMP,
        ),
      );
      rotateY.value = withTiming(
        interpolate(
          event.x,
          [0, METEORITE_WIDTH],
          [-10, 10],
          Extrapolate.CLAMP,
        ),
      );
    })
    .onUpdate((event) => {
      rotateX.value = interpolate(
        event.y,
        [0, METEORITE_HEIGHT],
        [10, -10],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, METEORITE_WIDTH],
        [-10, 10],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });
  const meteoriteAnimatedStyles = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;

    return {
      transform: [
        {
          perspective: 300,
        },
        { rotateX: rotateXvalue },
        { rotateY: rotateYvalue },
      ],
    };
  }, []);
  //
  // /
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const meteorite = rect(50, 50, METEORITE_WIDTH, METEORITE_HEIGHT);

  const clip = Skia.Path.Make();
  clip.addOval(meteorite);
  return (
    <ScrollView style={{ backgroundColor: 'white', paddingTop: insets.top }}>
      <View style={{ backgroundColor: 'red' }}>
        <Pressable
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 20,
            backgroundColor: 'green',
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>WROC</Text>
        </Pressable>
        <Text style={{ textAlign: 'center' }}>NAME OF OBJECT</Text>
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={meteoriteAnimatedStyles}>
          <Canvas style={{ width, height: 300 }}>
            <Group clip={clip}>
              <Rect
                rect={rect(50, 50, 300, METEORITE_HEIGHT)}
                color="darkgray"
                origin={meteorite}
              >
                <CornerPathEffect r={60} />
                <DiscretePathEffect length={40} deviation={40} />
              </Rect>
              <Circle r={30} c={vec(300, 50)} color="grey" />
              <Circle r={20} c={vec(100, 100)} color="grey" />
              <Circle r={15} c={vec(200, 150)} color="grey" />
              <Circle r={30} c={vec(310, 170)} color="grey" />
            </Group>
          </Canvas>
        </Animated.View>
      </GestureDetector>
    </ScrollView>
  );
};
