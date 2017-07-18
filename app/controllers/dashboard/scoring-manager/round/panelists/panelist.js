import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  panelistSortProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedItems: Ember.computed.sort(
    'model.round.panelists',
    'panelistSortProperties'
  ),
  isStarted: Ember.computed.equal(
    'model.round.status',
    'Started',
  ),
  isFinished: Ember.computed.equal(
    'model.round.status',
    'Finished',
  ),
  isAnnounced: Ember.computed.equal(
    'model.round.status',
    'Announced',
  ),
  isDisabled: Ember.computed.or(
    'isStarted',
    'isFinished',
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
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
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
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.scoring-manager.round.panelists.panelist', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.scoring-manager.round.panelists.panelist', newCur);
    },
  },
});
