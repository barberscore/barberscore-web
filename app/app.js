import Application from '@ember/application';
import Resolver from './resolver';
import Sentry from './sentry';
import loadInitializers from 'ember-load-initializers';
import config from 'barberscore-web/config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  Sentry
});

loadInitializers(App, config.modulePrefix);
