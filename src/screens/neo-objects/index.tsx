import { useGetAllNeoObjects } from '@/api/neo-objects/get-neo-objects';
import { Asteroid, NeoObjectListItem } from '@/components';
import { horizontalScale, moderateScale } from '@/shared/utils';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
// import type { NeoObjectsStackParamList } from '../../navigation/neo-objects-navigator';

// type NeoObjectsScreenProps = NativeStackScreenProps<
//   NeoObjectsStackParamList,
//   'NeoObjects'
// >;
export const NeoObjects = () => {
  const { data } = useGetAllNeoObjects({
    startDate: '2023-10-20',
    endDate: '2023-10-20',
  });

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
  //TEST

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: horizontalScale(10) }}>
      <Animated.View
        style={[
          [
            {
              flex: 1,
              backgroundColor: 'red',
            },
            animatedAsteoroidContainerStyles,
          ],
        ]}
      >
        <Asteroid />
      </Animated.View>
      <View style={{ flex: 3 }}>
        <Button
          title="OUT"
          onPress={() => {
            positionX.value = withSpring(300, {
              velocity: 100,
            });
            positionY.value = withSpring(-300, {
              velocity: 100,
            });
          }}
        />
        <Button
          title="IN"
          onPress={() => {
            positionX.value = withSpring(0, {
              velocity: 100,
            });
            positionY.value = withSpring(0, {
              velocity: 100,
            });
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>PREV</Text>
          </View>
          <Text>CUrrent date </Text>
          <View>
            <Text>NEXT</Text>
          </View>
        </View>
        <FlatList
          data={data?.near_earth_objects['2023-10-20']}
          renderItem={({ item }) => {
            return <NeoObjectListItem item={item} />;
          }}
        />
      </View>

      {/* {data?.near_earth_objects['2023-10-20'].map((i) => (
        <View key={i.id}>
          <Text>{i.name}</Text>
        </View>
      ))} */}
    </SafeAreaView>
  );
};
