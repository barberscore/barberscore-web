import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sortProperties: [
    'kindSort:asc',
    'name:asc',
    'status:desc',
  ],
  filteredEntities: Ember.computed.filterBy(
    'model.children',
    'isGroup',
  ),
  sortedItems: Ember.computed.sort(
    'filteredEntities',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
