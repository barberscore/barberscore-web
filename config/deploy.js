/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3 = {
      bucket: 'barberscore.com',
      region: 'us-west-1',
      filePattern: '**/*.{js,css,png,gif,html,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf}'
    };
    ENV.slack = {
      webhookURL: 'https://hooks.slack.com/services/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'
    };
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
