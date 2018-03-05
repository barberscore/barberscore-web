import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  deleteEntryModal: false,
  deleteEntryModalError: false,
  deleteEntry: task(function *() {
    try {
      yield this.model.destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.set('deleteEntryModal', false);
      this.set('deleteEntryModalError', false);
      this.get('flashMessages').success("Deleted!");
      this.transitionToRoute('dashboard.group-manager.group.entries.index');
    } catch(e) {
      this.set('deleteEntryModalError', true);
    }
  }).drop(),
});
