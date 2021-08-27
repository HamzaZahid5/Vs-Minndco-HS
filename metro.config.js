const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts },
  } = await getDefaultConfig();

  return {
    resolver: {
      sourceExts: [...sourceExts, 'js', 'json', 'ts', 'tsx'],
      assetExts: [...assetExts, 'mp3', 'png', 'jpg'],
    },
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
  };
})();
