module.exports = {
  // Only emit the Umami tag when set at build time (Coolify build env).
  websiteId: process.env.ANALYTICS_WEBSITE_ID || '',
  scriptSrc: process.env.ANALYTICS_SCRIPT_SRC || '/analytics/script.js',
  // Umami collect URL prefix; proxy maps this to the private analytics host.
  hostUrl: process.env.ANALYTICS_HOST_URL || '/analytics',
};
