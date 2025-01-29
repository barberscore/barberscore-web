import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'barberscore-web/config/environment';

/* import * as Sentry from '@sentry/ember'
import * as Integrations from '@sentry/integrations';


Sentry.init({
  dsn: config.APP.SENTRY_DSN,
  environment: config.APP.HEROKU_APP_NAME,
  sendDefaultPii: true,
  integrations: [new Integrations.Ember()],
  beforeSend: (event, hint) => {
   if (config.environment !== 'production' || hint.originalException.name === 'TransitionAborted') {
    // eslint-disable-next-line
    console.error(hint.originalException || hint.syntheticException);
    return null; // this drops the event and nothing will be send to sentry
   }
   return event;
  }
}); */

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

loadInitializers(App, config.modulePrefix);

export default App;
