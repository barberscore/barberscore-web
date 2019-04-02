import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  deleteOutcomeModal: false,
  deleteOutcomeModalError: false,
  deleteOutcome: task(function *() {
    try {
      yield this.model.destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.set('deleteOutcomeModal', false);
      this.set('deleteOutcomeModalError', false);
      this.flashMessages.success("Deleted!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.rounds.round.outcomes');
    } catch(e) {
      this.set('deleteOutcomeModalError', true);
    }
  }).drop(),
});
