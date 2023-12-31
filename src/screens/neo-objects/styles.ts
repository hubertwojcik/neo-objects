import { colors, horizontalScale, verticalScale } from '@/shared/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E9',
  },
  screenTitle: {
    fontSize: 26,
    textAlign: 'center',
    color: colors.dark,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  neoListContainer: { flex: 3, paddingHorizontal: horizontalScale(10) },
  neoListStyle: {
    paddingHorizontal: horizontalScale(10),
  },
  neoListSeparator: {
    height: 1,
    width: '100%',
    marginVertical: verticalScale(5),
  },
});
