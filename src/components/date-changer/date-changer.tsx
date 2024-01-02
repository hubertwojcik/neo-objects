import { colors, normalize, verticalScale } from '@/shared/utils';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

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
        <AntDesign
          name="leftcircleo"
          size={verticalScale(24)}
          color={colors.black}
        />
      </Pressable>
      <Text style={styles.selectedDateText}>
        {dayjs(date).format('DD-MM-YYYY')}
      </Text>
      <Pressable onPress={incrementDate}>
        <AntDesign
          name="rightcircleo"
          size={verticalScale(24)}
          color={colors.black}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dateChangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  selectedDateText: {
    fontSize: normalize(20),
    color: colors.dark,
    marginBottom: verticalScale(12),
    fontFamily: 'Poppins-SemiBold',
  },
});
