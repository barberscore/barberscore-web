import Ember from 'ember';

export default Ember.Component.extend({
  sortedScoresProperties: [
    'songNum',
  ],
  sortedScores: Ember.computed.sort(
    'scores',
    'sortedScoresProperties'
  ),
});
