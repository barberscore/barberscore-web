import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sortProperties: [
    'kindSort:desc',
    'name:asc',
  ],
  activeEntities: Ember.computed.filterBy(
    'model.children',
    'status',
    'Active'
  ),
  sortedItems: Ember.computed.sort(
    'activeEntities',
    'sortProperties'
  ),
});
