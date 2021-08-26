const {
  task,
  series,
  parallel,
  src,
  dest
} = require('gulp');


const replace = require('gulp-replace');

function bulma() {
  return src('node_modules/bulma/**/*').pipe(dest('src/_static/vendor/bulma'))
}

function bulma_pricing() {
  return src('node_modules/bulma-pricingtable/src/sass/*.sass').pipe(dest('src/_static/vendor/bulma-pricingtable'))
}

function font() {
  return src('node_modules/@fontsource/inter/**/*').pipe(replace(/\.\/files\//g, '/static/font/inter/files/')).pipe(dest('src/_static/font/inter'))
}

function prismjs() {
  return src('node_modules/prismjs/themes/prism.css').pipe(cleanCSS({
    compatibility: 'ie8'
  })).pipe(dest('src/_static/vendor/prismjs'))
}

exports.default = parallel(bulma, bulma_pricing, font, prismjs)
