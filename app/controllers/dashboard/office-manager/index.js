import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'kind',
  ],
  kind: null,
  sortProperties: [
    'name',
    'kind',
    'status',
  ],
  sortedItems: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  kindOptions: [
    1,11,32
  ],
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
