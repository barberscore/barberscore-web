import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isSorting: false,
  entrySortProperties: [
    'draw:asc',
  ],
  sortedEntries: Ember.computed.sort(
    'model.entries',
    'entrySortProperties'
  ),
  actions: {
    reorderItems(itemModels) {
      let mtCount = this.get('model.mtCount');
      itemModels.forEach(function(item, index) {
        item.set('draw', index - mtCount + 1);
      });
    },
    saveOrder() {
      this.get('sortedEntries').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
