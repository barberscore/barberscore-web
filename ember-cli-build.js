'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
    'ember-bootstrap': {
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    },
    'ember-power-select': {
      theme: 'bootstrap'
    },
    sourcemaps: {
      enabled: true,
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  // app.import('node_modules/popper.js/dist/umd/popper.js.map', { destDir: 'assets' });
  /* app.import('node_modules/@sentry/browser/dist/index.js', {
    using: [
      { transformation: 'cjs', as: '@sentry/browser' }
    ]
  });

  app.import('node_modules/@sentry/integrations/dist/index.js', {
    using: [
      { transformation: 'cjs', as: '@sentry/integrations' }
    ]
  }); */

  app.import('node_modules/bootstrap/dist/css/bootstrap.css');

  return app.toTree();
};
