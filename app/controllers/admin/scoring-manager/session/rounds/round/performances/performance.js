import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  assignmentSortProperties: ['kind', 'category','slot',],
  flashMessage: Ember.get(this, 'flashMessages'),
  scoringAssignments: Ember.computed.filter('model.round.session.assignments',
    function(item) {
      return item.get('category') !== 'Admin';
    }
  ),
  sortedAssignments: Ember.computed.sort(
    'scoringAssignments',
    'assignmentSortProperties'
  ),
  songSortProperties: ['num',],
  sortedSongs: Ember.computed.sort(
    'model.songs',
    'songSortProperties'
  ),
  performanceSortProperties: [
    'num',
  ],
  sortedItems: Ember.computed.sort(
    'model.round.performances',
    'performanceSortProperties'
  ),
  actions: {
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('admin.scoring-manager.session.rounds.round.performances.performance', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('admin.scoring-manager.session.rounds.round.performances.performance', newCur);
    },
    savePerformance() {
      this.model.save()
      .then(response => {
        response.get('songs').invoke('save');
        let foo = response.get('songs');
        foo.forEach(function(song) {
          let bar = song.get('scores');
          bar.forEach(function(score) {
            score.save();
          });
        });
        this.model.verify()
        .then(() => {
          this.get('target.router').refresh();
        });
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    startPerformance() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    finishPerformance() {
      this.model.finish()
      .then(response => {
        this.store.pushPayload('performance', response);
      })
      .catch(() => {
      });
    },
    completePerformance() {
      this.model.complete()
      .then((response) => {
        this.store.pushPayload('performance', response);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveActualStart(date) {
      this.model.set('actual_start', date);
      this.model.save();
    },
    saveActualFinish(date) {
      this.model.set('actual_finish', date);
      this.model.save();
    },
    penalizeRepetition(score) {
      score.penalizeRepetition();
    },
    penalizeAccompaniment(score) {
      score.penalizeAccompaniment();
    },
    penalizeContent(score) {
      score.penalizeContent();
    },
    penalizeEnhancement(score) {
      score.penalizeEnhancement();
    },
  },
});
