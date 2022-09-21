module.exports = {
  ci: {
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse.atlas.bi',
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "content-width": "off",
        "color-contrast": "off",
        "crawlable-anchors": "off",
        "csp-xss": "off",
        "link-name": "off",
        "link-text": "off",
        "unused-css-rules": "off",
      },
    },
    collect: {
      staticDistDir: "_site",
      maxAutodiscoverUrls: 10,
      settings: {
        hostname: '127.0.0.1'
      },
    },
  },
};