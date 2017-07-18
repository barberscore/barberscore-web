import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sessionManager: Ember.inject.controller('dashboard.convention-manager.convention.sessions.index'),
  awardSortProperties: [
    'organizationKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  awardCall: Ember.computed(function(){
    return this.get('store').query('award', {
        'organization__officers__person__user': this.get('currentUser.user.id'),
      });
  }),
  filteredAwards: Ember.computed(
    'awardCall.@each.{kind,season}',
    'model.kind',
    'model.convention.season',
    function() {
      return this.get('awardCall').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
    }
  ),
  sessionSortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.alias('sessionManager.sortedSessions'),
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
  publishSession: task(function *() {
    let session = yield this.model.publish({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Published!");
  }).drop(),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
  },
});
