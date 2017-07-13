import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  uniqOrganizations: Ember.computed.uniq(
    'model',
  ),
  sortedOrganizations: Ember.computed.sort(
    'uniqOrganizations',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
