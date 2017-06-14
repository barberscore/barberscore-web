import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  openRound: task(function *() {
    let userID = this.get('currentUser.user.id');
    let round = yield this.model.open({
      'by': userID
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Opened!");
  }).drop(),
  closeRound: task(function *() {
    let userID = this.get('currentUser.user.id');
    let round = yield this.model.close({
      'by': userID
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Closed!");
  }).drop(),
  verifyRound: task(function *() {
    let userID = this.get('currentUser.user.id');
    let round = yield this.model.verify({
      'by': userID
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Verified!");
  }).drop(),
});
