import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Controller.extend({
  group: null,
  router: service(),
  algolia: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedEntriesProperties: [
    'nomen',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  searchGroup: task(function* (term){
    yield timeout(500);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Group', query: term})
    return res.hits
  }),
});


