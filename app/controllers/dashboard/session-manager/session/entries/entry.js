import { sort, filterBy, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller, { inject as controller } from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  isDisabled: computed(
    'model.status',
    function(){
      let disabled = [
        'Withdrawn',
        'Scratched',
      ]
      return disabled.includes(this.get('model.status'));
  }),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: sort(
    'model.group.repertories',
    'sortedRepertoriesProperties'
  ),
  sortedMembersProperties: [
    'partSort',
  ],
  sortedMembers: sort(
    'model.group.members',
    'sortedMembersProperties'
  ),
  contestantSortProperties: [
  ],
  sortedContestants: sort(
    'model.contestants',
    'contestantSortProperties'
  ),
  sortedContactsProperties: [
    'nomen',
  ],
  filteredContacts: filterBy(
    'model.group.members',
    'isAdmin'
  ),
  sortedContacts: sort(
    'filteredContacts',
    'sortedContactsProperties'
  ),
  inviteEntryModal: false,
  inviteEntryModalError: false,
  inviteEntry: task(function *() {
    try {
      let entry = yield this.model.invite({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('entry', entry);
      this.set('inviteEntryModal', false);
      this.set('inviteEntryModalError', false);
      this.get('flashMessages').success("Invited!");
    } catch(e) {
      this.set('inviteEntryModalError', true);
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
  entryManager: controller('dashboard.session-manager.session.entries.index'),
  sortedItems: alias('entryManager.sortedItems'),
  isPrevDisabled: computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.firstObject');
  }),
  isNextDisabled: computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.lastObject');
  }),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.session-manager.session.entries.entry', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.session-manager.session.entries.entry', newCur);
    },
  }
});
