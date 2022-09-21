module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    collect: {
      staticDistDir: "_site",
      settings: {
        hostname: '127.0.0.1'
      },
    },
  },
};