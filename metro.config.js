const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default Metro config
const config = getDefaultConfig(__dirname);

// Add path aliases
config.resolver.alias = {
  ...config.resolver.alias,
  '@': path.resolve(__dirname, './'),
};

// Ensure we recognize the file types
module.exports = config;
