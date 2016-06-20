import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  judgeSortProperties: ['kind', 'category','slot',],
  sortedJudges: Ember.computed.sort(
    'model.cursor.round.session.judges',
    'judgeSortProperties'
  ),
  songSortProperties: ['num',],
  sortedSongs: Ember.computed.sort(
    'model.cursor.songs',
    'songSortProperties'
  ),
  actions: {
    saveSong(song, submission) {
      song.set('chart', submission.get('chart'));
      song.save();
    },
    startPerformance() {
      this.set('model.round.session.cursor', this.model.id);
      this.get('model.round.session.content').save();
      this.model.start()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(response => {
        console.log(response);
      });
    },
    finishPerformance() {
      this.model.finish()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(response => {
        console.log(response);
      });
    },
    completePerformance() {
      this.model.complete()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(response => {
        console.log(response);
      });
    },
  },
});
