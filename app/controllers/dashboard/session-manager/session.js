import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  openSession: task(function *() {
    let session = yield this.model.open({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Opened!");
  }).drop(),
  closeSession: task(function *() {
    try {
      let session = yield this.model.close({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.get('flashMessages').success("Closed!");
    } catch(e) {
      this.get('flashMessages').danger("Closing Failed; Please check your entry.");
    }
  }).drop(),
  verifySession: task(function *() {
    try {
      let session = yield this.model.verify({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.get('flashMessages').success("Verified!");
    } catch(e) {
      this.get('flashMessages').danger("Verification Failed; Please check your entry.");
    }
  }).drop(),
});
