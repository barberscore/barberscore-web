import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  completeRoundModal: false,
  completeRoundModalError: false,
  completeRound: task(function *() {
    try {
      let round = yield this.model.complete({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('round', round);
      this.set('completeRoundModal', false);
      this.set('completeRoundModalError', false);
      this.flashMessages.success("Completed!");
    } catch(e) {
      this.set('completeRoundModalError', true);
    }
  }).drop(),
});
