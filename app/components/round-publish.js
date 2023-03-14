import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  publishRoundModal: false,
  publishRoundModalError: false,
  publishRoundModalErrorMessage: null,
  publishRound: task(function *() {
    try {
      this.set('publishRoundModalErrorMessage', null);
      let round = yield this.model.publish({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('round', round);
      this.set('publishRoundModal', false);
      this.set('publishRoundModalError', false);
      this.flashMessages.success("Published!");
      this.store.findRecord('session', this.model.sessionId, { reload: true });
    } catch(e) {
      this.set('publishRoundModalError', true);
      this.set('publishRoundModalErrorMessage', e.errors.status);
    }
  }).drop(),
});
