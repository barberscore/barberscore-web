/* jshint node: true */

module.exports = function(deployTarget) {
  let ENV = {
  };

  if (deployTarget === 'production') {
    ENV.bugsnag = {
      apiKey: process.env.BUGSNAG_API_KEY,
      publicUrl: process.env.BUGSNAG_PUBLIC_URL
    };
  };

  return ENV;
};
