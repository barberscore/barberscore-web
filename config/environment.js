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
    ENV.moment = {
          // Options:
          // 'all' - all years, all timezones
          // '2010-2020' - 2010-2020, all timezones
          // 'none' - no data, just timezone API
          'includeTimezone': 'all'
    };
    ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:8000/api-token-auth/',
      identificationField: 'email',
      passwordField: 'password',
      tokenPropertyName: 'token',
      authorizationPrefix: 'JWT',
      authorizationHeaderName: 'Authorization',
      headers: {},
      refreshAccessTokens: true,
      serverTokenRefreshEndpoint: '/api/token-refresh/',
      tokenExpireName: 'exp',
      refreshLeeway: 0,
      timeFactor: 1  // example - set to "1000" to convert incoming seconds to milliseconds.
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.moment = {
          // Options:
          // 'all' - all years, all timezones
          // '2010-2020' - 2010-2020, all timezones
          // 'none' - no data, just timezone API
          'includeTimezone': 'all'
    };
  }

  if (environment === 'production') {
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' http://s3-us-west-1.amazonaws.com",
      'font-src': "'self' ",
      'connect-src': "'self' http://barberscore.com",
      'img-src': "'self' http://s3-us-west-1.amazonaws.com",
      'style-src': "'self' http://s3-us-west-1.amazonaws.com ",
      'media-src': "'self'"
    };
    ENV.APP.API_HOST = 'http://barberscore.herokuapp.com';
    ENV.APP.API_NAMESPACE = 'api';
    ENV.moment = {
          // Options:
          // 'all' - all years, all timezones
          // '2010-2020' - 2010-2020, all timezones
          // 'none' - no data, just timezone API
          'includeTimezone': 'all'
    };
  }


  return ENV;
};
