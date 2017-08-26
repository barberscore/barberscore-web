import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  entrySortProperties: [
    'draw:asc',
  ],
  sortedEntries: Ember.computed.sort(
    'filteredEntries',
    'entrySortProperties'
  ),
  filteredEntries: Ember.computed.filterBy(
    'model.entries',
    'status',
    'Approved'
  ),
  actions: {
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('draw', index + 1);
      });
      itemModels.invoke('save');
      this.get('flashMessages').success('Success');
    },
    saveOrder() {
      this.get('sortedEntries').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
