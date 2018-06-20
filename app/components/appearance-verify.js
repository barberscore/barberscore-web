import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  verifyAppearanceModal: false,
  verifyAppearanceModalError: false,
  verifyAppearance: task(function *() {
    try {
      yield this.model.verify({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('verifyAppearanceModal', false);
      this.set('verifyAppearanceModalError', false);
      this.get('flashMessages').success("Verified!");
    } catch(e) {
      this.set('verifyAppearanceModalError', true);
    }
  }).drop(),
});
