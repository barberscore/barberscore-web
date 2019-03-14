import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  packageSessionModal: false,
  packageSessionModalError: false,
  packageSession: task(function *() {
    try {
      yield this.model.package({
        'by': this.get('currentUser.user.id')
      });
      this.model.reload();
      this.set('packageSessionModal', false);
      this.set('packageSessionModalError', false);
      this.flashMessages.success("Packaged!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.rounds');
    } catch(e) {
      this.set('packageSessionModalError', true);
    }
  }).drop(),
});
