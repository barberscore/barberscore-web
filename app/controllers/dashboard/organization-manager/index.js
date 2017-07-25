import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'statusSort:asc',
    'kindSort:asc',
    'name:asc',
  ],
  uniqueOrganizations: Ember.computed.uniq(
    'model',
  ),
  sortedOrganizations: Ember.computed.sort(
    'uniqueOrganizations',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
