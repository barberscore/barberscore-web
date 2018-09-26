import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
// import { task } from 'ember-concurrency';
// import { denodeify } from 'rsvp'
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  flashMessages: service(),
  algolia: service(),
  store: service(),
  // isDisabled: not(
  //   'model.permissions.write',
  // ),
  isDisabled: false,
  sortedContestsProperties: [
    'num',
  ],
  filteredChampionships: filterBy(
    'model.session.contests',
    'notQualifier',
  ),
  includedContests: filterBy(
    'model.session.contests',
    'num',
  ),
  sortedContests: sort(
    'includedContests',
    'sortedContestsProperties'
  ),
  sortedContestants: sort(
    'model.session.competitors',
    'sortedContestsProperties'
  ),
  searchGroup: task(function* (term){
    yield timeout(500);
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Group', query: term})
    return res.hits
  }),
  updateGroup: task(function* (contest, obj){
    if (obj) {
      let group = yield this.store.findRecord('group', obj.objectID)
      contest.set('group', group);
    } else {
      contest.set('group', null);
    }
    yield contest.save();
  }),
});


