import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  finishAppearanceModal: false,
  finishAppearanceModalError: false,
  finishAppearance: task(function *() {
    try {
      yield this.model.finish({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('finishAppearanceModal', false);
      this.set('finishAppearanceModalError', false);
      this.get('flashMessages').success("Finished!");
    } catch(e) {
      this.set('finishAppearanceModalError', true);
    }
  }).drop(),
});
