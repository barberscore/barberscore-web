import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.APP.API_HOST,
  namespace: ENV.APP.API_NAMESPACE,
  coalesceFindRequests: true,
  authorizer: 'authorizer:jwt',
  // TODO Probably should have the server return a 422
  handleResponse: function(status, headers, payload){
    if(status === 400 && payload.errors){
      return new DS.InvalidError(payload.errors);
    }
    return this._super(...arguments);
  }
});
