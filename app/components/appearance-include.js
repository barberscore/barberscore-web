import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  includeAppearanceModal: false,
  includeAppearanceModalError: false,
  includeAppearance: task(function *() {
    try {
      yield this.model.include({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('includeAppearanceModal', false);
      this.set('includeAppearanceModalError', false);
      this.get('flashMessages').success("Included!");
    } catch(e) {
      this.set('includeAppearanceModalError', true);
    }
  }).drop(),
});
