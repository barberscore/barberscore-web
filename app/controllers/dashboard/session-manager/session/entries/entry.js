import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  evalCollapsed: true,
  membersCollapsed: true,
  repertoryCollapsed: true,
  submitEntryModal: false,
  submitEntryModalError: false,
  submitEntry: task(function *() {
    try {
      let entry = yield this.model.submit({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('entry', entry);
      this.set('submitEntryModal', false);
      this.set('submitEntryModalError', false);
      this.get('flashMessages').success("Submitted!");
    } catch(e) {
      this.set('submitEntryModalError', true);
    }
  }).drop(),
  approveEntryModal: false,
  approveEntryModalError: false,
  approveEntry: task(function *() {
    try {
      let entry = yield this.model.approve({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('entry', entry);
      this.set('approveEntryModal', false);
      this.set('approveEntryModalError', false);
      this.get('flashMessages').success("Approved!");
    } catch(e) {
      this.set('approveEntryModalError', true);
    }
  }).drop(),
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
      this.transitionToRoute('dashboard.session-manager.session.entries.index');
    } catch(e) {
      this.set('deleteEntryModalError', true);
    }
  }).drop(),
  withdrawEntryModal: false,
  withdrawEntryModalError: false,
  withdrawEntry: task(function *() {
    try {
      let entry = yield this.model.withdraw({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('entry', entry);
      this.set('withdrawEntryModal', false);
      this.set('withdrawEntryModalError', false);
      this.get('flashMessages').success("Withdrawn!");
    } catch(e) {
      this.set('withdrawEntryModalError', true);
    }
  }).drop(),
  scratchEntryModal: false,
  scratchEntryModalError: false,
  scratchEntry: task(function *() {
    try {
      let entry = yield this.model.scratch({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('entry', entry);
      this.set('scratchEntryModal', false);
      this.set('scratchEntryModalError', false);
      this.get('flashMessages').success("Scratched!");
    } catch(e) {
      this.set('scratchEntryModalError', true);
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
  sortedEntriesProperties: [
    'nomen',
  ],
  ents: sort(
    'model.session.entries',
    'sortedEntriesProperties',
  ),
});
