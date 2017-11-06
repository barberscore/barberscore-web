import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import {
  task
} from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isIncluded: equal(
    'model.status',
    'Included',
  ),
  isExcluded: equal(
    'model.status',
    'Excluded',
  ),
  // toggleContest: task(function *() {
  //   if (this.isIncluded) {
  //     try {
  //       let contest = yield this.model.include({
  //         'by': this.get('currentUser.user.id'),
  //       });
  //       this.get('store').pushPayload('contest', contest);
  //       this.get('flashMessages').success("Included!");
  //     } catch(e) {
  //       this.get('flashMessages').danger("Problem!");
  //     }
  //   } else {
  //     try {
  //       let contest = yield this.model.exclude({
  //         'by': this.get('currentUser.user.id'),
  //       });
  //       this.get('store').pushPayload('contest', contest);
  //       this.get('flashMessages').success("Excluded!");
  //     } catch(e) {
  //       this.get('flashMessages').danger("Problem!");
  //     }
  //   }
  // }).drop(),
  includeParticipant: task(function *() {
    try {
      let participant = yield this.model.include({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('participant', participant);
      this.get('flashMessages').success("Included!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  excludeParticipant: task(function *() {
    try {
      let participant = yield this.model.exclude({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('participant', participant);
      this.get('flashMessages').success("Excluded!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
});
