import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  verifyRound: task(function *() {
    let round = yield this.model.verify({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Verified!");
  }).drop(),
  startRound: task(function *() {
    let round = yield this.model.start({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Started!");
  }).drop(),
  finishRound: task(function *() {
    let round = yield this.model.finish({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Finished!");
  }).drop(),
});
