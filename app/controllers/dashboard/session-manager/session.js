import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  openSessionModal: false,
  openSessionModalError: false,
  openSession: task(function *() {
    try {
      let session = yield this.model.open({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.set('openSessionModal', false);
      this.set('openSessionModalError', false);
      this.get('flashMessages').success("Opened!");
    } catch(e) {
      this.set('openSessionModalError', true);
    }
  }).drop(),
  restrictSessionModal: false,
  restrictSessionModalError: false,
  restrictSession: task(function *() {
    try {
      let session = yield this.model.restrict({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.set('restrictSessionModal', false);
      this.set('restrictSessionModalError', false);
      this.get('flashMessages').success("Restricted!");
    } catch(e) {
      this.set('restrictSessionModalError', true);
    }
  }).drop(),
  closeSessionModal: false,
  closeSessionModalError: false,
  closeSession: task(function *() {
    try {
      let session = yield this.model.close({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.set('closeSessionModal', false);
      this.set('closeSessionModalError', false);
      this.get('flashMessages').success("Closeed!");
    } catch(e) {
      this.set('closeSessionModalError', true);
    }
  }).drop(),
  verifySessionModal: false,
  verifySessionModalError: false,
  verifySession: task(function *() {
    try {
      let session = yield this.model.verify({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.set('verifySessionModal', false);
      this.set('verifySessionModalError', false);
      this.get('flashMessages').success("Verified!");
    } catch(e) {
      this.set('verifySessionModalError', true);
    }
  }).drop(),
  startSessionModal: false,
  startSessionModalError: false,
  startSession: task(function *() {
    try {
      let session = yield this.model.start({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('session', session);
      this.set('startSessionModal', false);
      this.set('startSessionModalError', false);
      this.get('flashMessages').success("Started!");
    } catch(e) {
      this.set('startSessionModalError', true);
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
