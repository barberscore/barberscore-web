/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    pipeline: {
      activateOnDeploy: true
    },
    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      filePattern: "*"
    },
    cloudfront: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
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
    ENV.s3.bucket = process.env.AWS_BUCKET;
    ENV.s3.region = process.env.AWS_DEFAULT_REGION;
    ENV.cloudfront.distribution = process.env.AWS_CLOUDFRONT_DISTRIBUTION;
    ENV.slack = {
      webhookURL: 'https://hooks.slack.com/services/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'
    };
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
