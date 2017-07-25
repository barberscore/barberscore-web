import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'statusSort:asc',
    'kindSort:asc',
    'nomen',
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
