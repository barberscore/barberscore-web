import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
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
      this.get('flashMessages').success("Closed!");
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
  sessionManager: controller('dashboard.session-manager.index'),
  sortedItems: alias('sessionManager.sortedSessions'),
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
      this.transitionToRoute('dashboard.session-manager.session.details', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.session-manager.session.details', newCur);
    },
  }
});
