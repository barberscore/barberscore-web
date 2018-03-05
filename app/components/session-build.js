import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  buildSessionModal: false,
  buildSessionModalError: false,
  buildSession: task(function *() {
    try {
      let session = yield this.model.build({
        'by': this.get('currentUser.user.id')
      });
      this.get('store').pushPayload('session', session);
      this.set('buildSessionModal', false);
      this.set('buildSessionModalError', false);
      this.get('flashMessages').success("Built!");
    } catch(e) {
      console.log(e);
      this.set('buildSessionModalError', true);
    }
  }).drop(),
});
