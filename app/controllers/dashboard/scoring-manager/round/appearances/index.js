import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isSorting: false,
  sortedAppearancesProperties: [
    'num',
  ],
  sortedAppearances: Ember.computed.sort(
    'model.appearances',
    'sortedAppearancesProperties'
  ),
  actions: {
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('num', index+1);
      });
    },
    saveOrder() {
      this.get('sortedAppearances').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
