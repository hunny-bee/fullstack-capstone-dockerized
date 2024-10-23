const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en', // Set the default language
    locales: ['en', 'fr', 'es'], // Supported languages
  },
  localePath: path.resolve('./public/locales'), // Path to your translation files
};
