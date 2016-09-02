/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'barberscore-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    moment: {
      allowEmpty: true // default: false
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = 'http://localhost:8000';
    ENV.APP.API_NAMESPACE = 'api';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' https://s3-us-west-1.amazonaws.com",
      'font-src': "'self' ",
      'connect-src': "'self' https://barberscore.com",
      'img-src': "'self' https://s3-us-west-1.amazonaws.com",
      'style-src': "'self' https://s3-us-west-1.amazonaws.com ",
      'media-src': "'self'"
    };
    ENV.APP.API_HOST = 'https://api.barberscore.com';
    ENV.APP.API_NAMESPACE = 'api';
  }


  return ENV;
};
