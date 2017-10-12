import { computed } from '@ember/object';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: service(),
  assignmentSortProperties: ['kind', 'category','slot',],
  sortedAssignments: sort(
    'model.cursor.round.session.assignments',
    'assignmentSortProperties'
  ),
  songSortProperties: ['num',],
  sortedSongs: sort(
    'model.cursor.songs',
    'songSortProperties'
  ),
  nextNum: computed(function(){
    return this.get('model.cursor.num') +1;
  }),
  nextAppearances: filterBy(
    'model.cursor.round.appearances',
    'num',
    'nextNum'
  ),
  actions: {
    // previousItem(sortedItems, cursor) {
    //   let nowCur = sortedItems.indexOf(cursor);
    //   let newCur = sortedItems.objectAt(nowCur-1);
    //   this.transitionToRoute('dashboard.convention', newCur);
    // },
    // nextItem() {
    //   this.
    //   this.transitionToRoute('dashboard.convention', newCur);
    // },
    saveActualStart(date) {
      this.get('model.cursor').then((cursor) => {
        cursor.set('actual_start', date);
        cursor.save();
      });
    },
    saveActualFinish(date) {
      this.get('model.cursor').then((cursor) => {
        cursor.set('actual_finish', date);
        cursor.save();
      });
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
