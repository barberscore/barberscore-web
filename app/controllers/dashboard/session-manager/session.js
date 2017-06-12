import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  openSession: task(function *() {
    let userID = this.get('currentUser.user.id');
    let session = yield this.model.open({
      'by': userID
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Opened!");
  }).drop(),
  closeSession: task(function *() {
    let userID = this.get('currentUser.user.id');
    let session = yield this.model.close({
      'by': userID
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Closed!");
  }).drop(),
  verifySession: task(function *() {
    let userID = this.get('currentUser.user.id');
    let session = yield this.model.verify({
      'by': userID
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Verified!");
  }).drop(),
});
