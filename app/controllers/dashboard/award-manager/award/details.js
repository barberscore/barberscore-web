import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  // awardManager: Ember.inject.controller('dashboard.award-manager'),
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.not(
    'model.permissions.write'
  ),
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'officers__person__user': this.get('currentUser.user.id'),
      'officers__person__is_award_manager': true
    });
  }),
  entityOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entityOptionsProperties'
  ),
  awardCall: Ember.computed(function() {
    return this.get('store').query('award', {
      'entity__officers__person__user': this.get('currentUser.user.id'),
      'entity__officers__person__is_award_manager': true
    });
  }),
  awardOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  awardOptions: Ember.computed.sort(
    'awardCall',
    'awardOptionsProperties'
  ),
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      this.get('flashMessages').danger("Could not save; possible duplicate or empty fields!");
    }
  }).restartable(),
  activateAward: task(function *() {
    try {
      let award = yield this.model.activate({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('award', award);
      this.get('flashMessages').success("Activated!");
    } catch(e) {
      this.get('flashMessages').danger("Please check that all fields are entered!");
    }
  }).drop(),
  dectivateAward: task(function *() {
    try {
      let award = yield this.model.deactivate({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('award', award);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.get('flashMessages').danger("Please check that all fields are entered!");
    }
  }).drop(),
  awardManager: Ember.inject.controller('dashboard.award-manager.index'),
  sortedItems: Ember.computed.alias(
    'awardManager.sortedItems',
  ),
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
      this.transitionToRoute('dashboard.award-manager.award.details', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.award-manager.award.details', newCur);
    },
  }
});
