const Image = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const criticalCss = require("eleventy-critical-css");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp"],
    outputDir: "./_site/static/img/",
    urlPath: "/static/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {

  eleventyConfig.setUseGitIgnore(true);

  // image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // minify html
  eleventyConfig.addTransform("htmlmin", require("./src/_utils/minify-html.js"));

  // copy font
  eleventyConfig.addPassthroughCopy({
    "src/_static/font/inter/files": "static/font/inter/files"
  });

  // copy images
  eleventyConfig.addPassthroughCopy({
    "src/_static/img": "static/img"
  });

  // prismjs syntax highlighter
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({
    "src/_static/vendor/prismjs/": "static/prismjs"
  });
  eleventyConfig.addPlugin(criticalCss);


  // Set custom directories for input, output, includes, and data
  return {
    dir: {
      input: "src",
      formats: "njk",
      includes: "_includes",
      data: "_static",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };

};
