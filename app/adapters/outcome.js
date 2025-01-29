import DS from 'ember-data';
import ENV from '../config/environment';
import { isPresent } from '@ember/utils';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend({
  host: ENV.APP.API_HOST,
  namespace: 'adjudication',
  coalesceFindRequests: false,
  authorize(xhr) {
    let { idToken } = this.get('session.data.authenticated');
    if (isPresent(idToken)) {
      xhr.setRequestHeader('Authorization', `Bearer ${idToken}`);
    }
  }
});
