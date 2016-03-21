import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  scoreSortProperties: ['points',],
  sortedScores: Ember.computed.sort(
    'model.scores',
    'scoreSortProperties'
  ),
});
