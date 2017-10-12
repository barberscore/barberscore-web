import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  activateGroupModal: false,
  activateGroupModalError: false,
  activateGroup: task(function *() {
    try {
      let group = yield this.model.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('group', group);
      this.set('activateGroupModal', false);
      this.set('activateGroupModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('activateGroupModalError', true);
    }
  }).drop(),
  deactivateGroupModal: false,
  deactivateGroupModalError: false,
  deactivateGroup: task(function *() {
    try {
      let group = yield this.model.deactivate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('group', group);
      this.set('deactivateGroupModal', false);
      this.set('deactivateGroupModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('deactivateGroupModalError', true);
    }
  }).drop(),
});
