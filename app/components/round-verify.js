import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  verifyRoundModal: false,
  verifyRoundModalError: false,
  verifyRound: task(function *() {
    try {
      let round = yield this.model.verify({
        'by': this.get('currentUser.user.id')
      });
      yield this.get('store').pushPayload('round', round);
      yield this.get('model.appearances').invoke('reload');
      yield this.get('model.session.contests').invoke('reload');
      this.set('verifyRoundModal', false);
      this.set('verifyRoundModalError', false);
      this.get('flashMessages').success("Verified!");
      // this.get('router').transitionTo('dashboard.conventions.convention.sessions.session.rounds.round.contests');
    } catch(e) {
      this.set('verifyRoundModalError', true);
    }
  }).drop(),
});
