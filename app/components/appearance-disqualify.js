import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  disqualifyAppearanceModal: false,
  disqualifyAppearanceModalError: false,
  disqualifyAppearance: task(function *() {
    try {
      let appearance = yield this.model.disqualify({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('appearance', appearance);
      this.set('disqualifyAppearanceModal', false);
      this.set('disqualifyAppearanceModalError', false);
      this.flashMessages.success("Disqaulified!");
    } catch(e) {
      this.set('disqualifyAppearanceModalError', true);
    }
  }).drop(),
});
