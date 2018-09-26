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
      this.store.pushPayload('round', round);
      this.get('model.session.competitors').invoke('reload');
      this.set('reviewRoundModal', false);
      this.set('reviewRoundModalError', false);
      this.flashMessages.success("Reviewed!");
    } catch(e) {
      this.set('reviewRoundModalError', true);
    }
  }).drop(),
});
