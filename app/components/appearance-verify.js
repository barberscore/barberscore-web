import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  router: service(),
  flashMessages: service(),
  verifyAppearance: task(function *() {
    try {
      let appearance = yield this.model.verify({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('appearance', appearance);
      yield this.model.competitor.reload();
      if (this.model.status === 'Variance') {
        this.flashMessages.warning("VARIANCE!");
      } else {
        this.flashMessages.success("Verified");
      }
    } catch(e) {
      this.flashMessages.danger(e.errors.status);
    }
  }).drop(),
});
