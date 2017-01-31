import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'start_date:asc',
    'end_date:asc',
  ],
  sortedConventions: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
