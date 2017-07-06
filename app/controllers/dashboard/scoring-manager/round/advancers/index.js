import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isSorting: false,
  advancersSortProperties: [
    'draw:asc',
  ],
  filteredAdvancers: Ember.computed.filterBy(
    'model.appearances',
    'isAdvancer'
  ),
  sortedAdvancers: Ember.computed.sort(
    'filteredAdvancers',
    'advancersSortProperties'
  ),
  actions: {
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('draw', index + 1);
      });
    },
    saveOrder() {
      this.get('sortedAdvancers').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
