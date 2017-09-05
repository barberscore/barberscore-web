import Ember from 'ember';
import {
  task
} from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  isNew: Ember.computed.equal('model.status', 'New'),
  isEditable: Ember.computed.and(
    'model.permissions.write',
    'isNew',
  ),
  isDisabled: Ember.computed.not(
    'isEditable',
  ),
  awardSortProperties: [
    'organizationKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  filteredAwards: Ember.computed(
    'model.convention.organization.awards.@each.{kind,season}',
    'model.kind',
    'model.convention.season',
    function () {
      return this.get('model.convention.organization.awards').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
    }
  ),
  sortedAwards: Ember.computed.sort(
    'filteredAwards',
    'awardSortProperties',
  ),
  publishSession: task(function* () {
    let session = yield this.model.publish({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Published!");
  }).drop(),
  sessionManager: Ember.inject.controller('dashboard.convention-manager.convention.sessions.index'),
  sessionSortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.alias('sessionManager.sortedSessions'),
  isPrevDisabled: Ember.computed(
    'model',
    'sortedItems',
    function () {
      return this.model == this.get('sortedItems.firstObject');
    }),
  isNextDisabled: Ember.computed(
    'model',
    'sortedItems',
    function () {
      return this.model == this.get('sortedItems.lastObject');
    }),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur - 1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur + 1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
  },
});
