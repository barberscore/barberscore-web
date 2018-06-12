import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  excludeAppearanceModal: false,
  excludeAppearanceModalError: false,
  excludeAppearance: task(function *() {
    try {
      yield this.model.exclude({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('excludeAppearanceModal', false);
      this.set('excludeAppearanceModalError', false);
      this.get('flashMessages').success("Excluded!");
    } catch(e) {
      this.set('excludeAppearanceModalError', true);
    }
  }).drop(),
});
