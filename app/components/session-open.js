import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  openSessionModal: false,
  openSessionModalError: false,
  openSession: task(function *() {
    try {
      let session = yield this.model.open({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('session', session);
      this.set('openSessionModal', false);
      this.set('openSessionModalError', false);
      this.flashMessages.success("Opened!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries');
    } catch(e) {
      this.set('openSessionModalError', true);
    }
  }).drop(),
});
