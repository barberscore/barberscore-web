import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations';

import config from './config/environment';

Sentry.init({
  dsn: config.APP.SENTRY_DSN,
  environment: config.environment,
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
});

export default Sentry;
