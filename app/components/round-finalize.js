import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  finalizeRoundModal: false,
  finalizeRoundModalError: false,
  finalizeRound: task(function *() {
    try {
      let round = yield this.model.finalize({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('round', round);
      this.set('finalizeRoundModal', false);
      this.set('finalizeRoundModalError', false);
      this.flashMessages.success("Finalized!");
      this.store.findRecord('convention', this.model.conventionId, { reload: true });
    } catch(e) {
      this.set('finalizeRoundModalError', true);
    }
  }).drop(),
});
