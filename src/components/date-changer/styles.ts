import { colors, verticalScale } from '@/shared/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dateChangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  selectedDateText: {
    fontSize: 20,
    color: colors.dark,
    marginBottom: verticalScale(12),
  },
});
