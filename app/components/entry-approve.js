import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  approveEntryModal: false,
  approveEntryModalError: false,
  approveEntry: task(function *() {
    try {
      yield this.model.approve({
        'by': this.get('currentUser.user.id'),
      });
      this.model.reload();
      this.set('approveEntryModal', false);
      this.set('approveEntryModalError', false);
      this.flashMessages.success("Approved!");
    } catch(e) {
      this.set('approveEntryModalError', true);
    }
  }).drop(),
});
