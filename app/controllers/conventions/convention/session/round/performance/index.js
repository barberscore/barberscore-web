import Ember from 'ember';

export default Ember.Controller.extend({
  scoreSortProperties: ['judge.slot',],
  sortedScores: Ember.computed.sort(
    'model.scores',
    'scoreSortProperties'
  ),
});
