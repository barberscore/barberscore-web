import Ember from 'ember';

export default Ember.Controller.extend({
  roundsSort: ['num:desc', ],
  sortedRounds: Ember.computed.sort(
    'model.rounds',
    'roundsSort'
  ),
  finishedSort: ['rank', 'performer.group.name',],
  donePerformers: Ember.computed.filterBy(
    'model.performers',
    'status',
    'Published'
  ),
  finishedPerformers: Ember.computed.sort(
    'donePerformers',
    'finishedSort'
  ),
  performanceSortProperties: [
    'round.kind', 'slot', 'performer.group.name',
  ],
  sortedItems: Ember.computed.sort(
    'model.current',
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
    }
  }
});
