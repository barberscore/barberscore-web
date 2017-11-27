import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
  startRound: task(function *() {
    let round = yield this.model.start({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Started!");
  }).drop(),
  reviewRound: task(function *() {
    let round = yield this.model.review({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Reviewed!");
  }).drop(),
  finishRound: task(function *() {
    let round = yield this.model.finish({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('round', round);
    this.get('flashMessages').success("Finished!");
  }).drop(),
});
