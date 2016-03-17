import Ember from 'ember';

export default Ember.Controller.extend({
  scoreSortProperties: ['judge.slot',],
  scoresSorted: Ember.computed.sort(
    'model.scores',
    'scoreSortProperties'
  ),
});
