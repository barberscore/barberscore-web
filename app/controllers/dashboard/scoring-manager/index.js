import Ember from 'ember';

export default Ember.Controller.extend({
  filteredRounds: Ember.computed.filterBy(
    'model',
    'conventionIsActive'
  ),
  sortedRoundsProperties: [
    'sessionConventionStartDate',
    'sessionKindSort',
    'kindSort:desc',
  ],
  sortedRounds: Ember.computed.sort(
    'filteredRounds',
    'sortedRoundsProperties'
  ),
  actions: {
    sortBy(sortedRoundsProperties) {
      this.set('sortedRoundsProperties', [sortedRoundsProperties]);
    },
  }
});
