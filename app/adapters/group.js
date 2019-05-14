import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import AdapterArrayBufferMixin from 'ember-cli-file-saver/mixins/adapter-arraybuffer-mixin';

export default DS.JSONAPIAdapter.extend(AdapterArrayBufferMixin, DataAdapterMixin, {
  host: ENV.APP.API_HOST,
  namespace: 'bhs',
  coalesceFindRequests: false,
  authorizer: 'authorizer:jwt',
});
