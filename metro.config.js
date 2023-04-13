// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts },
  } = await getDefaultConfig()

  return {
    resolver: {
      sourceExts: [...sourceExts, 'js', 'json', 'ts', 'tsx'],
      assetExts: [...assetExts, 'mp3', 'png', 'jpg'],
    },
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    server: {
      rewriteRequestUrl: (url) => {
        if (!url.endsWith('.bundle')) {
          return url;
        }
        // https://github.com/facebook/react-native/issues/36794
        // JavaScriptCore strips query strings, so try to re-add them with a best guess.
        return url + '?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true';
      }, // ...
    }, // ...
  }
})()
