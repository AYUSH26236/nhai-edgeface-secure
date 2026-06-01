module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    'react-native-worklets-core/plugin',
  ],
};