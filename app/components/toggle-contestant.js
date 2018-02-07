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
  includeContestant: task(function *() {
    try {
      let contestant = yield this.model.include({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('contestant', contestant);
      this.get('flashMessages').success("Included!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  excludeContestant: task(function *() {
    try {
      let contestant = yield this.model.exclude({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('contestant', contestant);
      this.get('flashMessages').success("Excluded!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  toggleContestant: task(function *(value) {
    if (value) {
      try {
        let contestant = yield this.model.include({
          'by': this.get('currentUser.user.id'),
        });
        this.get('store').pushPayload('contestant', contestant);
        this.get('flashMessages').success("Included!");
      } catch(e) {
        this.get('flashMessages').danger("Problem!");
      }
    } else {
      try {
        let contestant = yield this.model.exclude({
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
