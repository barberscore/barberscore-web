module.exports = function(deployTarget){
  let ENV = {
  };
  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV.APP.API_HOST = 'https://api.staging.barberscore.com';
    ENV.APP.API_NAMESPACE = 'api';
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard',
      auth0: {
        clientID: 'Xn5FtWgltna8tvrMdIPwMYS1Vp5HQvcq',
        domain: 'barberscore-staging.auth0.com',
      }
    };
  };
  return ENV;
};
