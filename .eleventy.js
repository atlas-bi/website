const Image = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const slugify = require("slugify");
const metagen = require("eleventy-plugin-metagen");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const outdent = require('outdent');
const schema = require("@quasibit/eleventy-plugin-schema");
const readingTime = require('reading-time');
const editOnGithub = require('eleventy-plugin-edit-on-github');
const fetch = require('node-fetch');
const rollupPlugin = require('eleventy-plugin-rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const cleanup = require('rollup-plugin-cleanup');

const { EleventyRenderPlugin } = require("@11ty/eleventy");

const RenderManager = EleventyRenderPlugin.RenderManager;

const slugifyCustom = (s) =>
  slugify(s, { lower: true, remove: /[*+~.()'"!:@]/g });

const unwrapper = (html) => {
  return html.replace(/^<p[^>]*>/,'').replace(/<\/p>$/,'')
}

async function imageShortcode(src, alt, sizes, type='asdf', loading="lazy", decoding="async", classes="") {
  let metadata = await Image(src, {
    widths: [24, 300, 400, 500, 600, 800, 1200],
    formats: ["webp", "png"],
    sharpWebpOptions: {
      options: {
        quality:70
      }
    },
    outputDir: "./_site/static/img/",
    urlPath: "/static/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: loading,
    decoding: decoding,
    class: classes || "m-0",
  };

  if(type=="boxed"){
      return `<div class="mt-8"><div class="inline-block">` + Image.generateHTML(metadata, imageAttributes) + `</div></div>`;
  }
  // using custom code so that we can return the highest src in img as old browsers don't auto upscale.
  let lowsrc = metadata.png[0];
  let highsrc = metadata.png[metadata.png.length - 1];
  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${highsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="${loading}"
        decoding="${decoding}"
        class="${classes}">
    </picture>`;
}

// from https://github.com/pusher/docs/blob/main/.eleventy.js
// widont is a function that takes a string and replaces the space between the last two words with a non breaking space. This stops typographic widows forming
const widont = (string) => {
  return string.split(" ").length > 2
    ? string.replace(/\s([^\s<]+)\s*$/, "\u00A0$1")
    : string;
};

async function getPage(url){
  const response = await fetch(url);
  const body = await response.text();
  fixed = body.replace(/```env/g, '```ini')
  fixed = fixed.replace(/```sh/g, '```bash')
  return fixed
}

module.exports = function(eleventyConfig) {

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addFilter("widont", widont);
  eleventyConfig.addWatchTarget("./src/static/");
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addExtension("sh", {
    key: "njk",
  });
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("get_page", getPage);

  if (process.env.ELEVENTY_PRODUCTION == true){
    eleventyConfig.addTransform("htmlmin", require("./src/_utils/minify-html.js"));
  }

  eleventyConfig.addPlugin(syntaxHighlight, {
    preAttributes: {
      class: ({ language }) => `group/code animate-fade rounded-lg bg-slate-900/80 language-${language || 'plain'}`,
    },
  });
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(schema);
  eleventyConfig.addPlugin(rollupPlugin, {
    rollupOptions: {
  output: { format: 'es', name: 'module', dir: '_site/static/js', },
  plugins: [
     nodeResolve({ browser: true }),
     commonjs({ sourceMap: false }),
     cleanup(),
     babel({
       babelHelpers: 'bundled',
     }),

    json(),
  ],
},
  });
  eleventyConfig.addPlugin(editOnGithub, {
    github_edit_repo: 'https://github.com/atlas-bi/website',
    github_edit_text: 'Edit this page on GitHub',
    github_edit_class: 'hover:text-slate-900 dark:hover:text-slate-400',
  });

  /* Markdown Plugins */
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownIt = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  });

  const opts = {
    level: [2, 3, 4, 5],
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      class: "absolute -ml-7 flex items-center opacity-0 border-0 group-hover:opacity-100 text-blue-400 hover:text-blue-800 transition-colors no-underline",
      symbol:"∞",
      placement: "before"
    }),
    slugify: slugifyCustom,
  };

  const mapping = {
    h1: 'text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200',
    h2: 'group flex -ml-4 pl-4',
    h3: 'border-b',
    a: 'text-sky-500 hover:text-sky-600 no-underline',
    p: 'mt-8',
    table: 'table',

  };

  markdownIt.renderer.rules.code_inline = (tokens, idx, { langPrefix = "" }) => {
  const token = tokens[idx];
  return `<code class="bg-slate-200 py-1 -my-1 rounded">${markdownIt.utils.escapeHtml(token.content)}</code>`;
};
  markdownIt
      .use(markdownItAnchor, opts)
      .use(require("markdown-it-imsize"), { autofill: true })
      .use(require('@toycode/markdown-it-class'), mapping)
      .use(require('markdown-it-div'), 'div', {})
      .use(require('markdown-it-emoji'));

  eleventyConfig.setLibrary("md", markdownIt);

  // copy search template
  eleventyConfig.addPassthroughCopy({
    'src/_includes/components/searchResults.njk': 'static/searchResults.njk',
  });

  // copy installers
  // eleventyConfig.addPassthroughCopy({"src/installers": "installers"});


  eleventyConfig.addShortcode('version', function () {
    return String(Date.now());
  });

  // copy images
  eleventyConfig.addPassthroughCopy({
    "src/static/img": "static/img"
  });

  // copy robots
  eleventyConfig.addPassthroughCopy({
    "src/robots.txt": "robots.txt"
  });

  // copy favicon
  eleventyConfig.addPassthroughCopy({
    "src/static/img/favicon.ico": "favicon.ico"
  });

  eleventyConfig.addFilter("jsonify", (text) => {
    return JSON.stringify(text).replace(/(?:\\n\s*){2,}/g, "\\n");
  });

  eleventyConfig.addFilter("readingTime", (text) => {
    return stats = readingTime(text).text;
  })

  eleventyConfig.addFilter("niceDate", (value) => {
    try{
      const options = {year: 'numeric', month: 'short', day: 'numeric' };
          return value.toLocaleDateString('en-us', options);
        } catch (e) {
          return value
        }

  });

  eleventyConfig.addFilter("startsWith", (value, check) => {
    return value.startsWith(check)
  })

  eleventyConfig.addShortcode("year", () => {
    return new Date().getFullYear();
  });

  eleventyConfig.addFilter('flattenNavigationAndAddNextPrev', (nav) => {
    const flat = [];
    const visit = (items) => {
      for (const item of items) {
        flat.push(item);
        visit(item.children);
      }
    };
    visit(nav);
    return flat;
  });

  eleventyConfig.addFilter("algExcerpt", (text) => {
    return text
      .replace(/<code class="language-.*?">.*?<\/code>/gs, "")
      .replace(/<.*?>/g, "")
      .substring(0, 8000);
  });

  eleventyConfig.addAsyncFilter("render", async(value, ctx) => {
  let renderMgr = new RenderManager();
  const t = await renderMgr.compile(value, 'njk')
  const h = (await t()).replace(/^\s*---(.*)---\s*$/gms,'')
  return h
  })

  eleventyConfig.addCollection("algolia", function(collection) {
    return collection.getFilteredByGlob("**/*.md");
  });

  const icons = {
    note: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path><path d="M15 3v6h6"></path></svg>',
    hint: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>',
    alert: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>'
  };

  eleventyConfig.addShortcode("admonition", function(icon, title, text) {
    return outdent`
    <div class="mt-8 relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 bg-background text-foreground ${icon}">
    ${icons[icon]} 
    <h5 class="mb-1 font-medium leading-none tracking-tight">${title}</h5>
      <div class="text-sm [&amp;_p]:leading-relaxed mt-0">${unwrapper(markdownIt.render(text))}</div>
    </div>`;
  });


  eleventyConfig.addFilter('markdown', value => {
    return `${markdownIt.render(value)}`;
  });

  return {
    dir: {
      input: "src",
      formats: "njk",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "html", "njk", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };

};
