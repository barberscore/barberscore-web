import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  resetRoundModal: false,
  resetRoundModalError: false,
  resetRound: task(function *() {
    try {
      let round = yield this.model.reset({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('round', round);
      this.set('resetRoundModal', false);
      this.set('resetRoundModalError', false);
      this.flashMessages.success("Reset!");
    } catch(e) {
      this.set('resetRoundModalError', true);
    }
  }).drop(),
});
