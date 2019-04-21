import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  scratchAppearanceModal: false,
  scratchAppearanceModalError: false,
  scratchAppearance: task(function *() {
    try {
      let appearance = yield this.model.scratch({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('appearance', appearance);
      this.set('scratchAppearanceModal', false);
      this.set('scratchAppearanceModalError', false);
      this.flashMessages.success("Scratchn!");
    } catch(e) {
      this.set('scratchAppearanceModalError', true);
    }
  }).drop(),
});
