import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  deleteAppearanceModal: false,
  deleteAppearanceModalError: false,
  deleteAppearance: task(function *() {
    try {
      this.set('deleteAppearanceModal', false);
      this.set('deleteAppearanceModalError', false);
      this.flashMessages.success("Deleted!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.rounds.round.appearances');
      yield this.model.destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.onDeleteAppearance();
    } catch(e) {
      this.set('deleteAppearanceModalError', true);
    }
  }).drop(),
});
