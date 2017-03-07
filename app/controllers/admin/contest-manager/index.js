import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'kind:asc',
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
