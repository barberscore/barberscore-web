import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  startRoundModal: false,
  startRoundModalError: false,
  startRound: task(function *() {
    try {
      let round = yield this.model.start({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('round', round);
      this.set('startRoundModal', false);
      this.set('startRoundModalError', false);
      this.flashMessages.success("Started!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.rounds.round.appearances');
      this.store.find('round', this.get('id'), { include: 'appearances', reload: true });
    } catch(e) {
      this.set('startRoundModalError', true);
    }
  }).drop(),
});
