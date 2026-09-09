module.exports = (api) => {
  api.cache(true);
  const presets = [];
  const plugins = [];
  comments = false;
  minified = true;
  return {
    presets,
    plugins,
  };
};
