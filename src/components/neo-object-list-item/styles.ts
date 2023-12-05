import {
  colors,
  getElevation,
  horizontalScale,
  verticalScale,
} from '@/shared/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.white,
    borderRadius: horizontalScale(10),
    ...getElevation({ elevation: 5 }),
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(4),
  },
  listItemSkeletonWrapper: { paddingVertical: verticalScale(10) },
  listItemTitle: {
    color: colors.dark,
    fontSize: 16,
  },
  hazardousIconWrapper: { marginRight: horizontalScale(10) },
  expandedWrapper: {
    overflow: 'hidden',
    ...getElevation({ elevation: 10 }),
  },
  expandedContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: horizontalScale(10),
  },
  expandedContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandedItemWrapper: { flex: 1 },
  expandedDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collapsableText: {
    fontSize: 12,
    color: colors.dark,
  },
});
