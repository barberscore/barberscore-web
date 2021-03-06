import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  withdrawEntryModal: false,
  withdrawEntryModalError: false,
  withdrawEntry: task(function *() {
    try {
      let entry = yield this.model.withdraw({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('entry', entry);
      this.set('withdrawEntryModal', false);
      this.set('withdrawEntryModalError', false);
      this.flashMessages.success("Withdrawn!");
    } catch(e) {
      this.set('withdrawEntryModalError', true);
    }
  }).drop(),
});
