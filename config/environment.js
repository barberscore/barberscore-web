'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'barberscore-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    moment: {
      outputFormat: 'LL',
      allowEmpty: true // default: false
    },
    sentry: {
      dsn: 'https://deb5efb3e84548ee88393bbee137c4b9@sentry.io/295564',
      development: environment === 'development',
    },
    contentSecurityPolicy: {
      'font-src': [
        'data:',
        '*.auth0.com',
      ].join(' '),
      'style-src': [
        "'unsafe-inline'",
      ].join(' '),
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'cdn.ravenjs.com',
        'localhost:4200',
        '*.auth0.com',

      ].join(' '),
      'img-src': [
        'data:',
        '*.getsentry.com',
        '*.gravatar.com',
        '*.wp.com',
        '*.auth0.com',
      ].join(' '),
      'connect-src': [
        "'self'",
        'localhost:4200',
        '*.auth0.com',
        '*.getsentry.com',
      ].join(' ')
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = 'http://localhost:8000';
    ENV.APP.API_NAMESPACE = 'api';
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard',
      auth0: {
        clientID: 'C68OwqrFDjUa6lv8t4jZQPDksWmrtvoF',
        domain: 'barberscore-dev.auth0.com',
      }
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.APP.API_HOST = null;
    ENV.APP.API_NAMESPACE = null;
    ENV['ember-simple-auth'] = null;
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'https://api.barberscore.com';
    ENV.APP.API_NAMESPACE = 'api';
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard',
      auth0: {
        clientID: '0asRmTDrVcFf1DQfO9s51qyqDW5cneGk',
        domain: 'barberscore.auth0.com',
      }
    };
  }
  return ENV;
};
