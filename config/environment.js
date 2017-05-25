/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'barberscore-web',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    moment: {
      outputFormat: 'LL',
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
        'http://localhost:4200',
        'https://*.auth0.com',
        'https://widget.intercom.io',
        'https://js.intercomcdn.com',
      ].join(' '),
      'media-src': [
        'https://js.intercomcdn.com',
      ].join(' '),
      'img-src': [
        'data:',
        '*.gravatar.com',
        '*.wp.com',
        'https://*.auth0.com',
        'https://static.intercomcdn.com',
        'https://js.intercomcdn.com',
      ].join(' '),
      'connect-src': [
        'http://localhost:4200',
        'https://*.auth0.com',
        'https://api-iam.intercom.io',
        'https://api-ping.intercom.io',
        'https://nexus-websocket-a.intercom.io',
        'https://nexus-websocket-b.intercom.io',
        'wss://nexus-websocket-a.intercom.io',
        'wss://nexus-websocket-b.intercom.io',
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
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'index',
    routeAfterAuthentication: 'dashboard',
    routeIfAlreadyAuthenticated: 'dashboard',
    auth0: {
      clientID: process.env.AUTH0_CLIENT_ID,
      domain: process.env.AUTH0_DOMAIN,
    }
  };

  ENV.APP.API_HOST = process.env.API_HOST;
  ENV.APP.API_NAMESPACE = process.env.API_NAMESPACE;

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.rootURL = '/';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  }
  return ENV;
};
