import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'is_primary:desc',
    'name:asc',
    'kindOptions',
  ],
  activeAwards: Ember.computed.filterBy(
    'model.awards',
    'status',
    'Active'
  ),
  sortedItems: Ember.computed.sort(
    'activeAwards',
    'sortProperties'
  )
});
