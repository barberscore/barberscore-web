module.exports = function(deployTarget){
  let ENV = {};
  if (deployTarget === 'production') {
    ENV.sentry = {
      publicUrl: 'https://www.barberscore.com',
      sentryUrl: 'https://sentry.io',
      sentryOrganizationSlug: 'barberscore',
      sentryProjectSlug: 'web',
      sentryBearerApiKey: process.env.SENTRY_API_KEY.
      enableRevisionTagging: false
    };
  }
  return ENV;
};
