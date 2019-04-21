import { inject as service } from '@ember/service';
import { sort, not } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  contestantSortProperties: [
    'awardSort',
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
        yield this.store.pushPayload('contestant', contestant);
        this.flashMessages.success("Included!");
      } catch(e) {
        this.flashMessages.danger("Problem!");
      }
    } else {
      try {
        let contestant = yield property.exclude({
          'by': this.get('currentUser.user.id'),
        });
        yield this.store.pushPayload('contestant', contestant);
        this.flashMessages.success("Excluded!");
      } catch(e) {
        this.flashMessages.danger("Problem!");
      }
    }
  }).drop(),
});
