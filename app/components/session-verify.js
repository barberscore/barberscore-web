import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  verifySessionModal: false,
  verifySessionModalError: false,
  verifySession: task(function *() {
    try {
      let session = yield this.model.verify({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('session', session);
      this.set('verifySessionModal', false);
      this.set('verifySessionModalError', false);
      this.flashMessages.success("Verified!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.reports');
    } catch(e) {
      this.set('verifySessionModalError', true);
    }
  }).drop(),
});
