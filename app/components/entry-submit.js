import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  submitEntryModal: false,
  submitEntryModalError: false,
  submitEntry: task(function *() {
    try {
      let entry = yield this.model.submit({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('entry', entry);
      this.set('submitEntryModal', false);
      this.set('submitEntryModalError', false);
      this.get('flashMessages').success("Submitted!");
    } catch(e) {
      this.set('submitEntryModalError', true);
    }
  }).drop(),
});
