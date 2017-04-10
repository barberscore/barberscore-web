import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  assignmentSortProperties: ['kind', 'category','slot',],
  sortedAssignments: Ember.computed.sort(
    'model.cursor.round.session.assignments',
    'assignmentSortProperties'
  ),
  songSortProperties: ['num',],
  sortedSongs: Ember.computed.sort(
    'model.cursor.songs',
    'songSortProperties'
  ),
  nextNum: Ember.computed(function(){
    return this.get('model.cursor.num') +1;
  }),
  nextAppearances: Ember.computed.filterBy(
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
