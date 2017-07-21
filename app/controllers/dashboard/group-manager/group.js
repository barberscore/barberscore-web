import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.not(
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
