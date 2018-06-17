import { sort, filterBy } from '@ember/object/computed';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
// import { task } from 'ember-concurrency';
import { denodeify } from 'rsvp'
import { task, timeout } from 'ember-concurrency';
// import { denodeify } from 'rsvp'
import config from '../config/environment';
// import { computed } from '@ember/object';

export default Component.extend({
  apiHost: config.APP.API_HOST,
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  sortedContestantsProperties: [
    'competitorPoints:desc',
  ],
  filteredContestants: filterBy(
    'model.contestants',
    'status',
    'Included',
  ),
  sortedContestants: sort(
    'filteredContestants',
    'sortedContestantsProperties'
  ),
  searchGroups: task(function* (term){
    yield timeout(500);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Group', query: term})
    return res.hits
  }),
  autosave: task(function* (value){
    this.get('model').set('champion', value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
});


