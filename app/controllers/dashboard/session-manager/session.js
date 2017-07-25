import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  openSession: task(function *() {
    let session = yield this.model.open({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Opened!");
  }).drop(),
  closeSession: task(function *() {
    try {
      let session = yield this.model.close({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.get('flashMessages').success("Closed!");
    } catch(e) {
      this.get('flashMessages').danger("Closing Failed; Please check your entry.");
    }
  }).drop(),
  verifySession: task(function *() {
    try {
      let session = yield this.model.verify({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.get('flashMessages').success("Verified!");
    } catch(e) {
      this.get('flashMessages').danger("Verification Failed; Please check your entry.");
    }
  }).drop(),
  startSession: task(function *() {
    try {
      let session = yield this.model.start({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.get('flashMessages').success("Started!");
    } catch(e) {
      this.get('flashMessages').danger("Session Start Failed; Please check your entry.");
    }
  }).drop(),
  sessionManager: Ember.inject.controller('dashboard.session-manager.index'),
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
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.session-manager.session.details', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.session-manager.session.details', newCur);
    },
  }
});
