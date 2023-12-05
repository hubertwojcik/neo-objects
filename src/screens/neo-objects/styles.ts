import { colors, horizontalScale, verticalScale } from '@/shared/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
    color: colors.dark,
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
