import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  reviewRoundModal: false,
  reviewRoundModalError: false,
  reviewRound: task(function *() {
    try {
      let round = yield this.model.review({
        'by': this.get('currentUser.user.id')
      });
      this.get('store').pushPayload('round', round);
      this.set('reviewRoundModal', false);
      this.set('reviewRoundModalError', false);
      this.get('flashMessages').success("Reviewed!");
    } catch(e) {
      this.set('reviewRoundModalError', true);
    }
  }).drop(),
});
