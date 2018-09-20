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
      this.get('model').reload();
      if (this.get('model.varianceReport') == null) {
        this.get('flashMessages').warning("VARIANCE!");
      } else {
        this.get('flashMessages').success("Verified!");
      }
    } catch(e) {
      this.get('flashMessages').error(e);
    }
  }).drop(),
});
