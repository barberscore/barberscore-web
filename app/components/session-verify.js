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
      yield this.get('model').verify({
        'by': this.get('currentUser.user.id')
      });
      this.get('model').reload();
      this.set('verifySessionModal', false);
      this.set('verifySessionModalError', false);
      this.get('flashMessages').success("Verified!");
      this.get('router').transitionTo('dashboard.conventions.convention.sessions.session.details');
    } catch(e) {
      this.set('verifySessionModalError', true);
    }
  }).drop(),
});
