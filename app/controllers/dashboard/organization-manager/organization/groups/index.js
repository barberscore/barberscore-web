import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sortProperties: [
    'kindSort:desc',
    'name:asc',
  ],
  filteredEntities: Ember.computed.filterBy(
    'model.children',
    'isGroup',
  ),
  sortedItems: Ember.computed.sort(
    'filteredEntities',
    'sortProperties'
  ),
});
