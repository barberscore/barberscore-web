/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'test') {
    ENV.build.environment = 'test';
    // configure other plugins for test deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV['bugsnag'] = {
      apiKey: process.env.BUGSNAG_API_KEY,
      publicUrl: "https://barberscore-web-staging.herokuapp.com",
    };
    ENV.currentRevision = process.env.HEROKU_RELEASE_VERSION;
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV['bugsnag'] = {
      apiKey: process.env.BUGSNAG_API_KEY,
      publicUrl: "https://barberscore.com",
    };
    ENV.currentRevision = process.env.HEROKU_RELEASE_VERSION;
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
