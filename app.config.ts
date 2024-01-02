import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env.js';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  owner: Env.EXPO_ACCOUNT_OWNER,
  version: Env.VERSION.toString(),
  slug: 'neo-objects',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      ...ClientEnv,
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
