import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  scratchEntryModal: false,
  scratchEntryModalError: false,
  scratchEntry: task(function *() {
    try {
      let entry = yield this.model.scratch({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('entry', entry);
      this.set('scratchEntryModal', false);
      this.set('scratchEntryModalError', false);
      this.get('flashMessages').success("Scratched!");
    } catch(e) {
      this.set('scratchEntryModalError', true);
    }
  }).drop(),
});
