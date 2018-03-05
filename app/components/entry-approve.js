import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  approveEntryModal: false,
  approveEntryModalError: false,
  approveEntry: task(function *() {
    try {
      let entry = yield this.model.approve({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('entry', entry);
      this.set('approveEntryModal', false);
      this.set('approveEntryModalError', false);
      this.get('flashMessages').success("Approved!");
      this.get('router').transitionTo('dashboard.group-manager.group.entries.index');
    } catch(e) {
      this.set('approveEntryModalError', true);
    }
  }).drop(),
});
