module.exports = function (api) {
  api.cache(true);
  const presets = [['minify', { builtIns: false}]];
  const plugins = [];
  comments = false;
  minified = true;
  return {
    presets,
    plugins,
  };
};

