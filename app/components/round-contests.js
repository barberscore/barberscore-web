import { not, sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
// import { task } from 'ember-concurrency';
// import { denodeify } from 'rsvp'
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'
import config from '../config/environment';
// import { computed } from '@ember/object';

export default Component.extend({
  flashMessages: service(),
  store: service(),
  // isDisabled: not(
  //   'model.permissions.write',
  // ),
  isDisabled: false,
  sortedContestsProperties: [
    'tree_sort',
  ],
  filteredContests: filterBy(
    'model.session.contests',
    'status',
    'Included',
  ),
  sortedContests: sort(
    'filteredContests',
    'sortedContestsProperties'
  ),
  sortedContestants: sort(
    'model.session.competitors',
    'sortedContestsProperties'
  ),
  group: null,

  searchGroup: task(function* (term){
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


