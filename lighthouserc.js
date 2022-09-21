module.exports = {
  ci: {
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse.atlas.bi',
    },
    // assert: {
    //   preset: 'lighthouse:recommended',
    // },
    collect: {
      staticDistDir: "_site",
      maxAutodiscoverUrls: 10,
      settings: {
        hostname: '127.0.0.1'
      },
    },
  },
};