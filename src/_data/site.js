module.exports = {
  description:
    'Atlas. Analytics solutions for healthcare. By healthcare professionals, for healthcare professionals. Unified report library and extract scheduler.',
  image: '/static/img/report_group.png',
  keywords:
    'atlas, library, data governance, report, healthcare, report library, extract management, etl, automation hub, library',
  title:
    'Atlas. Analytics solutions for healthcare. Report Library and Automation Hub',
  url: (process.env.SITE_URL || 'http://127.0.0.1:8080').replace(/\/$/, ''),
  discord: 'https://discord.gg/hdz2cpygQD',
  github: 'https://github.com/atlas-bi',
  emails: {
    dan: process.env.SITE_EMAIL_DAN || '',
    christopher: process.env.SITE_EMAIL_CHRISTOPHER || '',
  },
};
