import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  groupManager: Ember.inject.controller('dashboard.organization-manager.organization.groups.index'),
  flashMessages: Ember.inject.service(),
  sortedItems: Ember.computed.alias('groupManager.sortedItems'),
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
  activateGroup: task(function *() {
    try {
      let group = yield this.model.activate({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('group', group);
      this.get('flashMessages').success("Activated!");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).drop(),
  deactivateGroup: task(function *() {
    try {
      let group = yield this.model.deactivate({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('group', group);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).drop(),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.organization-manager.organization.groups.group', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.organization-manager.organization.groups.group', newCur);
    },
  }
});
