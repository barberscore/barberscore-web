import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  convention: null,
  router: service(),
  algolia: service(),
  store: service(),
  searchConvention: task(function* (term){
    yield timeout(500);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Convention', query: term})
    return res.hits
  }),
  redirectConvention: task(function* (convention){
    let pk = yield convention.objectID;
    return this.get('router').transitionTo('dashboard.conventions.convention.details', pk);
  }),
});
