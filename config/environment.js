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
    ENV['auth0-ember-simple-auth'] = {
      clientID: "0asRmTDrVcFf1DQfO9s51qyqDW5cneGk",
      domain: "barberscore.auth0.com"
    };
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'index',
      routeAfterAuthentication: 'admin',
      routeIfAlreadyAuthenticated: 'admin'
    };
    ENV['contentSecurityPolicy'] = {
      'font-src': "'self' data: https://*.auth0.com",
      'style-src': "'self' 'unsafe-inline'",
      'script-src': "'self' 'unsafe-eval' https://*.auth0.com",
      'img-src': '*.gravatar.com *.wp.com data:',
      'connect-src': "'self' http://localhost:* https://barberscore.auth0.com"
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
  }

  if (environment === 'production') {
    ENV['auth0-ember-simple-auth'] = {
      clientID: "0asRmTDrVcFf1DQfO9s51qyqDW5cneGk",
      domain: "barberscore.auth0.com"
    };
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'index',
      routeAfterAuthentication: 'admin',
      routeIfAlreadyAuthenticated: 'admin'
    };
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' https://*.auth0.comhttps://s3-us-west-1.amazonaws.com",
      'font-src': "'self' data: https://*.auth0.com",
      'connect-src': "'self' https://barberscore.com https://barberscore.auth0.com",
      'img-src': "'self' https://s3-us-west-1.amazonaws.com *.gravatar.com *.wp.com data:",
      'style-src': "'self' 'unsafe-inline' https://s3-us-west-1.amazonaws.com",
      'media-src': "'self'"
    };
    ENV.APP.API_HOST = 'https://api.barberscore.com';
    ENV.APP.API_NAMESPACE = 'api';
  }


  return ENV;
};
