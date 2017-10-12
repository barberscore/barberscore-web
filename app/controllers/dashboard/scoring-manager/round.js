import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
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
  announceRound: task(function *() {
    let round = yield this.model.announce({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Announced!");
  }).drop(),
});
