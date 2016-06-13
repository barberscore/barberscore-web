import Ember from 'ember';

export default Ember.Controller.extend({
  songSortProperties: ['order',],
  sortedSongs: Ember.computed.sort(
    'model.songs',
    'songSortProperties'
  ),
  performanceSortProperties: [
    'round.kind', 'slot', 'performer.group.name',
  ],
  sortedItems: Ember.computed.sort(
    'model.round.performances',
    'performanceSortProperties'
  ),
  actions: {
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('public.convention.session.current', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('public.convention.session.current', newCur);
    },
  },
});
