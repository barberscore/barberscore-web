import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'statusSort:asc',
    'organizationKindSort:asc',
    'nomen:asc',
  ],
  uniqueSessions: Ember.computed.uniq(
    'model',
  ),
  sortedSessions: Ember.computed.sort(
    'uniqueSessions',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
