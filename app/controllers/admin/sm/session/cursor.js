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
  nextNum: Ember.computed(function(){
    return this.get('model.cursor.num') +1;
  }),
  nextPerformances: Ember.computed.filterBy(
    'model.cursor.round.performances',
    'num',
    'nextNum'
  ),
  actions: {
    // previousItem(sortedItems, cursor) {
    //   let nowCur = sortedItems.indexOf(cursor);
    //   let newCur = sortedItems.objectAt(nowCur-1);
    //   this.transitionToRoute('admin.convention', newCur);
    // },
    // nextItem() {
    //   this.
    //   this.transitionToRoute('admin.convention', newCur);
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
