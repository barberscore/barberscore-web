import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  activateMemberModal: false,
  activateMemberModalError: false,
  activateMember: task(function *() {
    try {
      let member = yield this.model.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('member', member);
      this.set('activateMemberModal', false);
      this.set('activateMemberModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('activateMemberModalError', true);
    }
  }).drop(),
  deactivateMemberModal: false,
  deactivateMemberModalError: false,
  deactivateMember: task(function *() {
    try {
      let member = yield this.model.deactivate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('member', member);
      this.set('deactivateMemberModal', false);
      this.set('deactivateMemberModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('deactivateMemberModalError', true);
    }
  }).drop(),
  deleteMemberModal: false,
  deleteMemberModalError: false,
  deleteMember: task(function *() {
    try {
      yield this.model.destroyRecord();
      this.set('deleteMemberModal', false);
      this.set('deleteMemberModalError', false);
      this.get('flashMessages').success("deleted!");
      this.transitionToRoute('dashboard.group-manager.group.members.index');
    } catch(e) {
      this.set('deleteMemberModalError', true);
    }
  }).drop(),
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
});
