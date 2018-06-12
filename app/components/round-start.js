import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  startRoundModal: false,
  startRoundModalError: false,
  startRound: task(function *() {
    try {
      let round = yield this.model.start({
        'by': this.get('currentUser.user.id')
      });
      this.model.reload();
      this.get('store').pushPayload('round', round);
      this.get('model.session.competitors').invoke('reload');
      this.set('startRoundModal', false);
      this.set('startRoundModalError', false);
      this.get('flashMessages').success("Started!");
    } catch(e) {
      this.set('startRoundModalError', true);
    }
  }).drop(),
});
