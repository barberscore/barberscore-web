import { computed } from '@ember/object';
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
  includeContest: task(function *() {
    try {
      let contest = yield this.model.include({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('contest', contest);
      this.get('flashMessages').success("Included!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  excludeContest: task(function *() {
    try {
      let contest = yield this.model.exclude({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('contest', contest);
      this.get('flashMessages').success("Excluded!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
});
