module.exports = {
  // Public website id (same value as the old post-build snippet).
  websiteId:
    process.env.ANALYTICS_WEBSITE_ID || '55090c28-71ab-434e-9169-952024791696',
  scriptSrc: process.env.ANALYTICS_SCRIPT_SRC || '/analytics/script.js',
  // Umami collect URL prefix; proxy maps this to the private analytics host.
  hostUrl: process.env.ANALYTICS_HOST_URL || '/analytics',
};
