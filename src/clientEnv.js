// Client variables

import Constants from 'expo-constants';
/**
 *  @type {typeof import('../env.js').ClientEnv}
 */

export default Constants.expoConfig?.extra?.eas ?? {};
