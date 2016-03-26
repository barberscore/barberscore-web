import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  judgeSortProperties: ['slot',],
  sortedJudges: Ember.computed.sort(
    'model.round.session.judges',
    'judgeSortProperties'
  ),
  scoreSortProperties: ['points',],
  sortedScores: Ember.computed.sort(
    'model.scores',
    'scoreSortProperties'
  ),
  pointss: Ember.computed.sum(
    'scores.@each.points'
  ),
  // pointss: 10,
  // // totalScores: Ember.computed.sum(
  // //   'pointss'
  // // ),

  actions: {
    saveSong(song, submission) {
      song.set('chart', submission.get('chart'));
      song.save();
    },
    dixonTest() {
      this.model.dixon();
    },
  },
});
