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
    storeConfigInMeta: true,
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
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
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
    ENV.APP.SENTRY_DSN = process.env.SENTRY_DSN;
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.API_HOST = process.env.API_HOST;
    ENV['ember-algolia'] = {
      algoliaId: process.env.ALGOLIASEARCH_APPLICATION_ID,
      algoliaKey: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
    };
    ENV['cloudinary'] = {
      cloudName: 'barberscore',
    };
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard',
      auth0: {
        clientID: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
        enableImpersonation: true,
      }
    };
  }

  if (environment === 'test') {
    ENV.APP.SENTRY_DSN = process.env.SENTRY_DSN;
    ENV.locationType = 'none';
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV['cloudinary'] = {
      cloudName: 'foobar',
    };
    ENV['ember-algolia'] = {
      algoliaId: 'foo',
      algoliaKey: 'bar',
    };
    ENV['ember-simple-auth'] = {
      auth0: {
        clientID: 'foo',
        domain: 'bar',
      }
    };
  }

  if (environment === 'production') {
    ENV.APP.SENTRY_DSN = process.env.SENTRY_DSN;
    ENV.APP.HEROKU_RELEASE_VERSION = process.env.HEROKU_RELEASE_VERSION;
    ENV.APP.API_HOST = process.env.API_HOST;
    ENV.APP.API_PROXY_HOST = process.env.API_PROXY_HOST;
    ENV['ember-algolia'] = {
      algoliaId: process.env.ALGOLIASEARCH_APPLICATION_ID,
      algoliaKey: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
    };
    ENV['cloudinary'] = {
      cloudName: 'barberscore',
    };
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard',
      auth0: {
        clientID: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
        enableImpersonation: true,
        silentAuth : {
          onSessionRestore: true,
          onSessionExpire: true,
          options: {
            scope: 'openid profile email',
            responseType: 'token id_token',
            audience: 'https://barberscore.auth0.com/userinfo',
            timeout: 5000
          }
        }
      }
    };
  }
  return ENV;
};
