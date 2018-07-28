import { inject as service } from '@ember/service';
import { not, sort, filterBy } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedContestsProperties: [
    'groupKindSort',
    'awardQualifier',
    'isPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: sort(
    'model.contests',
    'sortedContestsProperties'
  ),
  filteredContests: filterBy(
    'model.contests',
    'isIncluded',
  ),
  includedContests: sort(
    'filteredContests',
    'sortedContestsProperties'
  ),
  toggleContest: task(function *(property, value) {
    if (value) {
      try {
        let contest = yield property.include({
          'by': this.get('currentUser.user.id'),
        });
        this.get('store').pushPayload('contest', contest);
        this.get('flashMessages').success("Included!");
      } catch(e) {
        this.get('flashMessages').danger("Problem!");
      }
    } else {
      try {
        let contest = yield property.exclude({
          'by': this.get('currentUser.user.id'),
        });
        this.get('store').pushPayload('contest', contest);
        this.get('flashMessages').success("Excluded!");
      } catch(e) {
        this.get('flashMessages').danger("Problem!");
      }
    }
  }).drop(),
});
