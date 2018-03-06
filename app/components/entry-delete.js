import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  deleteEntryModal: false,
  deleteEntryModalError: false,
  deleteEntry: task(function *() {
    try {
      yield this.get('model').destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.set('deleteEntryModal', false);
      this.set('deleteEntryModalError', false);
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.set('deleteEntryModalError', true);
    }
  }).drop(),
});
