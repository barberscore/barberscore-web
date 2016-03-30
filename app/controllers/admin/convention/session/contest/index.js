import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  contestantSortProperties: ['rank:asc',],
  sortedContestants: Ember.computed.sort(
    'model.contestants',
    'contestantSortProperties'
  ),
});
