module.exports = {
  presets: ['module:metro-react-native-babel-preset', ['@babel/preset-react', { targets: { node: 'current' } }]],
  plugins: ["nativewind/babel"],
};
