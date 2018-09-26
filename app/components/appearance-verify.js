import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  verifyAppearance: task(function *() {
    try {
      yield this.model.verify({
        'by': this.get('currentUser.user.id'),
      });
      this.model.reload();
      if (this.get('model.varianceReport') == null) {
        this.flashMessages.success("Verified!");
      } else {
        this.flashMessages.warning("VARIANCE!");
      }
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
