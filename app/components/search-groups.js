import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  group: null,
  router: service(),
  algolia: service(),
  store: service(),
  searchGroup: task(function* (term){
    yield timeout(500);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Group', query: term})
    return res.hits
  }),
});


