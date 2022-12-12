module.exports = {
  ci: {
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse.atlas.bi',
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "content-width": "warn",
        "color-contrast": "warn",
        "crawlable-anchors": "warn",
        "csp-xss": "warn",
        "link-name": "warn",
        "link-text": "warn",
        "unused-css-rules": "warn",
        "tap-targets": "warn",
        "third-party-facades": "warn",
        "unused-javascript": "warn",
        "uses-passive-event-listeners": "warn",
        "lcp-lazy-loaded": "warn",
        "list": "warn",
        "heading-order": "warn",
        "label": "warn",
        "uses-rel-preconnect": "warn",
        "uses-responsive-images": "warn"
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