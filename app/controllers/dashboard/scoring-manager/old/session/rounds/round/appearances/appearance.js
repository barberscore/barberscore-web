import { filter, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: service(),
  assignmentSortProperties: ['kind', 'category','slot',],
  flashMessages: service(),
  scoringAssignments: filter('model.round.session.assignments',
    function(item) {
      return item.get('category') !== 'Admin';
    }
  ),
  sortedAssignments: sort(
    'scoringAssignments',
    'assignmentSortProperties'
  ),
  songSortProperties: ['num',],
  sortedSongs: sort(
    'model.songs',
    'songSortProperties'
  ),
  appearanceSortProperties: [
    'num',
  ],
  sortedItems: sort(
    'model.round.appearances',
    'appearanceSortProperties'
  ),
  actions: {
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('dashboard.scoring-manager.session.rounds.round.appearances.appearance', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('dashboard.scoring-manager.session.rounds.round.appearances.appearance', newCur);
    },
    saveAppearance() {
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
      });
    },
    startAppearance() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('appearance', response);
      });
    },
    finishAppearance() {
      this.model.finish()
      .then(response => {
        this.store.pushPayload('appearance', response);
      });
    },
    completeAppearance() {
      this.model.complete()
      .then((response) => {
        this.store.pushPayload('appearance', response);
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
