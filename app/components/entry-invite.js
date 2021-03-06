import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  inviteEntryModal: false,
  inviteEntryModalError: false,
  inviteEntry: task(function *() {
    try {
      let entry = yield this.model.invite({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('entry', entry);
      this.set('inviteEntryModal', false);
      this.set('inviteEntryModalError', false);
      this.flashMessages.success("Invited!");
    } catch(e) {
      this.set('inviteEntryModalError', true);
    }
  }).drop(),
});
