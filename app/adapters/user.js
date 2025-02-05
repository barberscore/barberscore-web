import DS from 'ember-data';
import ENV from '../config/environment';
import { isPresent } from '@ember/utils';
import ApplicationAdapter from './application';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default ApplicationAdapter.extend({
  host: ENV.APP.API_HOST,
  namespace: 'jwt',
  coalesceFindRequests: false,
  authorize(xhr) {
    let { idToken } = this.get('session.data.authenticated');
    if (isPresent(idToken)) {
      xhr.setRequestHeader('Authorization', `Bearer ${idToken}`);
    }
  }
});
