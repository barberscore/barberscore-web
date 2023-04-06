import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  buildRoundModal: false,
  buildRoundModalError: false,
  buildRoundModalErrorMessage: "Could not Build Round.  Please contact Support.", 
  buildRound: task(function *() {
    try {
      let round = yield this.model.build({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('round', round);
      this.set('buildRoundModal', false);
      this.set('buildRoundModalError', false);
      this.flashMessages.success("Built!");
    } catch(e) {
      console.log("e", e);
      this.set('buildRoundModalError', true);
      this.set('buildRoundModalErrorMessage', e.errors.status);
    }
  }).drop(),
});
