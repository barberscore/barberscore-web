import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  startSessionModal: false,
  startSessionModalError: false,
  startSession: task(function *() {
    try {
      yield this.model.start({
        'by': this.get('currentUser.user.id')
      });
      this.model.reload();
      this.set('startSessionModal', false);
      this.set('startSessionModalError', false);
      this.flashMessages.success("Started!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.rounds');
    } catch(e) {
      this.set('startSessionModalError', true);
    }
  }).drop(),
});
