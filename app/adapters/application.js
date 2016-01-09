import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.APP.API_HOST,
  namespace: ENV.APP.API_NAMESPACE,
  coalesceFindRequests: false,
});
