import Ember from 'ember';

export default Ember.Controller.extend({
  filteredSessions: Ember.computed.filterBy(
    'model',
    'conventionIsActive',
  ),
  sortProperties: [
    'conventionName:asc',
    'kind:asc',
  ],
  sortedSessions: Ember.computed.sort(
    'filteredSessions',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
