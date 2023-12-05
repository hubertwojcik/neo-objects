import { colors } from '@/shared/utils';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

type DateChangerProps = {
  date: string;
  incrementDate: () => void;
  decrementDate: () => void;
};

export const DateChanger = ({
  date,
  decrementDate,
  incrementDate,
}: DateChangerProps) => {
  return (
    <View style={styles.dateChangeContainer}>
      <Pressable onPress={decrementDate}>
        <AntDesign name="leftcircleo" size={24} color={colors.dark} />
      </Pressable>
      <Text style={styles.selectedDateText}>
        {dayjs(date).format('DD-MM-YYYY')}
      </Text>
      <Pressable onPress={incrementDate}>
        <AntDesign name="rightcircleo" size={24} color={colors.dark} />
      </Pressable>
    </View>
  );
};
