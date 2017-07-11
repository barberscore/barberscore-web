import Ember from 'ember';
import config from '../../../config/environment';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  chartManager: Ember.inject.controller('dashboard.chart-manager'),
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.not(
    'model.permissions.write'
  ),
  uploadPhoto: task(function * (file) {
    try {
      const host = config.APP.API_HOST;
      const namespace = config.APP.API_NAMESPACE;
      const target = this.get('model.id');
      let response = yield file.upload(`${host}/${namespace}/chart/${target}/image`);
      this.set('model.image', response.body.image);
      yield this.get('model').save();
      this.get('flashMessages').success("Saved!");
    } catch (e) {
      this.get('flashMessages').danger("Upload Failed!");
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
  activateChart: task(function *() {
    try {
      let chart = yield this.model.activate({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('chart', chart);
      this.get('flashMessages').success("Activated!");
    } catch(e) {
      this.get('flashMessages').danger("Please check that all fields are entered!");
    }
  }).drop(),
  dectivateChart: task(function *() {
    try {
      let chart = yield this.model.deactivate({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('chart', chart);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.get('flashMessages').danger("Please check that all fields are entered!");
    }
  }).drop(),
  sortedItemsSortProperties: [
    'statusSort',
  ],
  sortedItems: Ember.computed.sort(
    'chartManager.sortedItems',
    'sortedItemsSortProperties'
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
      this.transitionToRoute('dashboard.chart-manager.chart', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.chart-manager.chart', newCur);
    },
  }
  });
