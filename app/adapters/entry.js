import ENV from '../config/environment';
import { isPresent } from '@ember/utils';
import ApplicationAdapter from './application';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default ApplicationAdapter.extend({
  host: ENV.APP.API_HOST,
  namespace: 'registration',
  coalesceFindRequests: false,
});
