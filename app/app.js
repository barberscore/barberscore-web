import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

import * as Sentry from '@sentry/browser'
Sentry.init({
  dsn: 'https://7878190e210947428cf54df69d99e469@sentry.io/1300033',
  integrations: [new Sentry.Integrations.Ember()]
});

