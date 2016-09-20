/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'barberscore-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    moment: {
      allowEmpty: true // default: false
    },
    contentSecurityPolicy: {
      'font-src': [
        'data:',
        'https://*.auth0.com',
      ].join(' '),
      'style-src': [
        '\'unsafe-inline\'',
      ].join(' '),
      'script-src': [
        '\'unsafe-eval\'',
        'https://*.auth0.com',
      ].join(' '),
      'img-src': [
        'data:',
        '*.gravatar.com',
        '*.wp.com',
      ].join(' '),
      'connect-src': [
        'http://localhost:*',
        'https://barberscore.auth0.com',
      ].join(' ')
    },
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
  };

  ENV['auth0-ember-simple-auth'] = {
    clientID: "0asRmTDrVcFf1DQfO9s51qyqDW5cneGk",
    domain: "barberscore.auth0.com"
  };
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'index',
    routeAfterAuthentication: 'admin',
    routeIfAlreadyAuthenticated: 'admin'
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
    ENV.APP.API_HOST = 'https://api.barberscore.com';
    ENV.APP.API_NAMESPACE = 'api';
  }
  return ENV;
};
