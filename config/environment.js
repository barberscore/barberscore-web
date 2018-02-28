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
      API_HOST: process.env.API_HOST,
      API_NAMESPACE: process.env.API_NAMESPACE
    },
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'dashboard',
    routeIfAlreadyAuthenticated: 'dashboard',
    auth0: {
      clientID: process.env.AUTH0_CLIENT_ID,
      domain: process.env.AUTH0_DOMAIN,
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.currentRevision = process.env.SOURCE_VERSION;
  }
  return ENV;
};
