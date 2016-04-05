import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  contestSortProperties: ['name:asc',],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  nextRoundArray: Ember.computed.filterBy(
    'model.rounds',
    'status',
    'Ready'
  ),
  nextRound: Ember.computed(
    'nextRoundArray',
    function() {
      return this.get('nextRoundArray')[0];
    }
  ),
  performanceSortProperties: ['slot:asc',],
  sortedPerformances: Ember.computed.sort(
    'nextRound.performances',
    'performanceSortProperties'
  ),
});
