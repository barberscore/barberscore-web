import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  finishRoundModal: false,
  finishRoundModalError: false,
  finishRound: task(function *() {
    try {
      let round = yield this.model.finish({
        'by': this.get('currentUser.user.id')
      });
      this.get('store').pushPayload('round', round);
      this.get('model.session.competitors').invoke('reload');
      this.get('model.session.rounds').invoke('reload');
      this.get('model.appearances').invoke('reload');
      this.set('finishRoundModal', false);
      this.set('finishRoundModalError', false);
      this.get('flashMessages').success("Finished!");
    } catch(e) {
      this.set('finishRoundModalError', true);
    }
  }).drop(),
});
