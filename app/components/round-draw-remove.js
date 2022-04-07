import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  removeFromDrawModal: false,
  removeFromDrawModalError: false,
  removeFromDraw: task(function *(appearance) {
    yield this.model.set('draw', null);
    try {
      yield this.model.save();
      this.flashMessages.success("Removed!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
});
