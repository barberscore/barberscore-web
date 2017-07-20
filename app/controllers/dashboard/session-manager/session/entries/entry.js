import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isDisabled: Ember.computed(
    'model.status',
    function(){
      let disabled = [
        'Declined',
        'Scratched',
        'Announced',
      ]
      if (disabled.includes(this.get('model.status'))) {
        return true;
      } else {
        return false;
      }
  }),
  searchChart: task(function* (term){
    yield timeout(600);
    return this.get('store').query('chart', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: Ember.computed.sort(
    'model.group.repertories',
    'sortedRepertoriesProperties'
  ),
  sortedParticipantsProperties: [
    'nameSort',
  ],
  sortedParticipants: Ember.computed.sort(
    'model.participants',
    'sortedParticipantsProperties'
  ),
  sortedExpirationsProperties: [
    'nameSort',
  ],
  sortedExpirations: Ember.computed.sort(
    'model.expiringMembers',
    'sortedExpirationsProperties'
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
  // awardSortProperties: [
  //   'organizationKindSort',
  //   'isQualifier',
  //   'isPrimary:desc',
  //   'ageSort',
  //   'name',
  // ],
  // awardCall: Ember.computed(function(){
  //   return this.get('store').query('award', {
  //       'organization__officers__person__user': this.get('currentUser.user.id'),
  //     });
  // }),
  // filteredAwards: Ember.computed(
  //   'awardCall.@each.{kind,season}',
  //   'model.kind',
  //   'model.convention.season',
  //   function() {
  //     return this.get('awardCall').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
  //   }
  // ),
  // representingCall: Ember.computed(function() {
  //   return this.get('store').query('organization', {
  //     'kind__lt': '30',
  //     'status': 10,
  //     'page_size': 100,
  //   });
  // }),
  // representingSortProperties: [
  //   'nomen:asc',
  // ],
  // representingOptions: Ember.computed.sort(
  //   'representingCall',
  //   'representingSortProperties'
  // ),
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
  declineEntryModal: false,
  declineEntryModalError: false,
  declineEntry: task(function *() {
    try {
      let entry = yield this.model.decline({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('entry', entry);
      this.set('declineEntryModal', false);
      this.set('declineEntryModalError', false);
      this.get('flashMessages').success("Declined!");
    } catch(e) {
      this.set('declineEntryModalError', true);
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
      this.get('flashMessages').success("Submit!");
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
  entryManager: Ember.inject.controller('dashboard.session-manager.session.entries.index'),
  sortedItems: Ember.computed.alias('entryManager.sortedItems'),
  isPrevDisabled: Ember.computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.firstObject');
  }),
  isNextDisabled: Ember.computed(
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
