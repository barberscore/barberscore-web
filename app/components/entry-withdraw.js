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
      yield this.model.withdraw({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('withdrawEntryModal', false);
      this.set('withdrawEntryModalError', false);
      this.get('flashMessages').success("Withdrawn!");
    } catch(e) {
      this.set('withdrawEntryModalError', true);
    }
  }).drop(),
});