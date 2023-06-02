const path = require('path');
module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['vi', 'en'],
      localePath: path.resolve('./public/locales'),
      localeDetection: true
    },
  }