module.exports = function (api) {
  api.cache(true);
  const presets = [['minify', { builtIns: false}]];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};

