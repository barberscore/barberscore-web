import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  submitEntryModal: false,
  submitEntryModalError: false,
  submitEntry: task(function *() {
    try {
      let entry = yield this.model.submit({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('entry', entry);
      this.set('submitEntryModal', false);
      this.set('submitEntryModalError', false);
      this.flashMessages.success("Submitted!");
      this.router.transitionTo(this.callback);
    } catch(e) {
      this.set('submitEntryModalError', true);
    }
  }).drop(),
});
