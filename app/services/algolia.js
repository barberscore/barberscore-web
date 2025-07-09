import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';
import Sentry from '../sentry';
import { algoliasearch } from "algoliasearch";
import ENV from '../config/environment';

export default Service.extend({
  session: service(),
  store: service(),
  client: null,
  setupClient: function() {
    if (!this.get('client'))
      this.set('client', algoliasearch(ENV.APP.ALGOLIA_APPLICATION_ID, ENV.APP.ALGOLIA_API_KEY));
  },

  search: async function(params) {
    console.log("Search function called");
    console.log(params);
    const { results } = await this.get('client').search({
      requests: [{
        indexName: params.indexName,
        query: params.query
      }]
    });
    return results[0];
  }

});
