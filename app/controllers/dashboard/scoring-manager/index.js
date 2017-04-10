import Ember from 'ember';

export default Ember.Controller.extend({
  sortedRoundsProperties: [
    'sessionConventionStartDate',
    'sessionKindSort',
    'kindSort:desc',
  ],
  sortedRounds: Ember.computed.sort(
    'model',
    'sortedRoundsProperties'
  ),
  actions: {
    sortBy(sortedRoundsProperties) {
      this.set('sortedRoundsProperties', [sortedRoundsProperties]);
    },
  }
});
