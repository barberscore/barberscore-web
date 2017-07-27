import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'statusSort:asc',
    'organizationKindSort:asc',
    'nomen:asc',
  ],
  sortedSessions: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
