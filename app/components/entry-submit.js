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
      yield this.model.submit({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('submitEntryModal', false);
      this.set('submitEntryModalError', false);
      this.get('flashMessages').success("Submitted!");
      this.get('router').transitionTo(this.get('callback'));
    } catch(e) {
      this.set('submitEntryModalError', true);
    }
  }).drop(),
});
