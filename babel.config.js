module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@env': './src/clientEnv.js',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
