import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.not(
    'model.permissions.write',
  ),
  contestSortProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  contestOptions: Ember.computed.sort(
    'model.session.contests',
    'contestSortProperties'
  ),
  filteredMembers: Ember.computed.filterBy(
    'model.group.members',
    'canParticipate',
  ),
  memberSortProperties: [
    'personLast',
    'nomen',
  ],
  memberOptions: Ember.computed.sort(
    'filteredMembers',
    'memberSortProperties'
  ),
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
      this.transitionToRoute('dashboard.group-manager.group.entries.index');
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
});
