/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'barberscore-ember',
    environment: environment,
    rootURL: '/',
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
        'https://static.intercomcdn.com',
        'https://js.intercomcdn.com',
      ].join(' '),
      'connect-src': [
        'https://api-iam.intercom.io',
        'https://api-ping.intercom.io',
        'https://nexus-websocket-a.intercom.io',
        'https://nexus-websocket-b.intercom.io',
        'wss://nexus-websocket-a.intercom.io',
        'wss://nexus-websocket-b.intercom.io',
      ].join(' ')
    },
    // intercom: {
    //   appId: 'hb6rvkui',
    //   deferReadinessUntilLoaded: false
    // },
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
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'index',
      routeAfterAuthentication: 'index',
      routeIfAlreadyAuthenticated: 'index',
      auth0: {
        clientID: process.env.AUTH0_CLIENT_ID_DEV,
        domain: process.env.AUTH0_DOMAIN_DEV,
        redirectURI: '/'
      }
    };
    ENV.APP.API_HOST = process.env.API_HOST_DEV;
    ENV.APP.API_NAMESPACE = process.env.API_NAMESPACE_DEV;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'index',
      routeAfterAuthentication: 'index',
      routeIfAlreadyAuthenticated: 'index',
      auth0: {
        clientID: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
        redirectURI: '/'
      }
    };
    ENV.APP.API_HOST = process.env.API_HOST;
    ENV.APP.API_NAMESPACE = process.env.API_NAMESPACE;
  }
  return ENV;
};
