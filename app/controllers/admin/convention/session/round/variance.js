import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  judgeSortProperties: ['slot',],
  sortedJudges: Ember.computed.sort(
    'model.round.session.judges',
    'judgeSortProperties'
  ),
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
