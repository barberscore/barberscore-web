import { inject as service } from '@ember/service';
import { sort, not, alias } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  notWritable: not(
    'model.permissions.write',
  ),
  isDisabled: alias(
    'notWritable',
  ),
  contestantSortProperties: [
    'contestGroupKindSort',
    'contestAwardQualifier',
    'contestAwardPrimary',
    'contestAwardAgeSort',
    'contestAwardName',
  ],
  sortedContestants: sort(
    'model.contestants',
    'contestantSortProperties'
  ),
  toggleContestant: task(function *(property, value) {
    if (value) {
      try {
        let contestant = yield property.include({
          'by': this.get('currentUser.user.id'),
        });
        this.get('store').pushPayload('contestant', contestant);
        this.get('flashMessages').success("Included!");
      } catch(e) {
        this.get('flashMessages').danger("Problem!");
      }
    } else {
      try {
        let contestant = yield property.exclude({
          'by': this.get('currentUser.user.id'),
        });
        this.get('store').pushPayload('contestant', contestant);
        this.get('flashMessages').success("Excluded!");
      } catch(e) {
        this.get('flashMessages').danger("Problem!");
      }
    }
  }).drop(),
});
