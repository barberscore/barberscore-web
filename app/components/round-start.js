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
      yield this.model.reload();
      yield this.store.pushPayload('round', round);
      yield this.get('model.appearances.@each.group').invoke('reload');
      yield this.get('model.panelists.@each.person').invoke('reload');
      this.set('startRoundModal', false);
      this.set('startRoundModalError', false);
      this.flashMessages.success("Started!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.rounds.round.appearances');
    } catch(e) {
      this.set('startRoundModalError', true);
    }
  }).drop(),
});
