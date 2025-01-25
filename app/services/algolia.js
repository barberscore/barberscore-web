import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';
import Sentry from '../sentry';

export default Service.extend({
  session: service(),
  store: service(),

});
