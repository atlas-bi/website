const esbuild = require('esbuild')

module.exports = class {
  data() {
    return {
      permalink: false,
      eleventyExcludeFromCollections: true
    }
  }

  async render() {
    await esbuild.build({
      entryPoints: ['src/static/js/collapse.js', 'src/static/js/search.js','src/static/js/tabs.js','src/static/js/hamburger.js'],
      bundle: true,
      minify: true,
      outdir: '_site/static/js',
      sourcemap: false,
      target: 'es5'
    })
  }
}
