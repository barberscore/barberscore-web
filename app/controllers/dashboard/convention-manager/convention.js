import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  publishConventionModal: false,
  publishConventionModalError: false,
  publishConvention: task(function *() {
    try {
      let convention = yield this.model.publish({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('convention', convention);
      this.set('publishConventionModal', false);
      this.set('publishConventionModalError', false);
      this.get('flashMessages').success("Published!");
    } catch(e) {
      this.set('publishConventionModalError', true);
    }
  }).drop(),
  archiveConventionModal: false,
  archiveConventionModalError: false,
  archiveConvention: task(function *() {
    try {
      let convention = yield this.model.archive({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('convention', convention);
      this.set('archiveConventionModal', false);
      this.set('archiveConventionModalError', false);
      this.get('flashMessages').success("Archived!");
    } catch(e) {
      this.set('archiveConventionModalError', true);
    }
  }).drop(),
  conventionManager: Ember.inject.controller('dashboard.convention-manager.index'),
  conventionSortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.alias('conventionManager.sortedConventions'),
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
      this.transitionToRoute('dashboard.convention-manager.convention.details', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.convention-manager.convention.details', newCur);
    },
  },
});
