const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US"
      }
    };
  }
  return {
    reactStrictMode: true,
    i18n: {
      locales: ["en-US"],
      defaultLocale: "en-US"
    }
  };
};
