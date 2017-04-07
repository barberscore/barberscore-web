import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  sortedOrganizations: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
