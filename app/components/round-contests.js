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
  singlesOnly: filterBy(
    'filteredChampionships',
    'includedContestantsCount',
    1,
  ),
  numberedContests: filterBy(
    'singlesOnly',
    'num',
  ),
  filteredContests: filterBy(
    'numberedContests',
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
  searchGroup: task(function* (term){
    yield timeout(500);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Group', query: term})
    return res.hits
  }),
  updateGroup: task(function* (contest, obj){
    if (obj) {
      let group = yield this.get('store').findRecord('group', obj.objectID)
      contest.set('group', group);
    } else {
      contest.set('group', null);
    }
    yield contest.save();
  }),
});


