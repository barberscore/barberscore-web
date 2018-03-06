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
      yield this.model.open({
        'by': this.get('currentUser.user.id')
      });
      this.get('model').reload();
      this.set('openSessionModal', false);
      this.set('openSessionModalError', false);
      this.get('flashMessages').success("Opened!");
      this.get('router').transitionTo('dashboard.session-manager.session.entries');
    } catch(e) {
      this.set('openSessionModalError', true);
    }
  }).drop(),
});
