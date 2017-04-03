import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
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
