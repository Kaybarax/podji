// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Exclude test files from the bundle
config.resolver.sourceExts =
  process.env.NODE_ENV === 'test'
    ? ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
    : ['ts', 'tsx', 'js', 'jsx', 'json', 'node'].filter(ext => !ext.includes('test'));

// Exclude test directories from the bundle
config.resolver.blockList = [/.*\.test\.[jt]sx?$/, /.*\/__tests__\/.*/, /.*\/test\/.*/];

module.exports = config;
