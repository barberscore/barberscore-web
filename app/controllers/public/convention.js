import Ember from 'ember';

export default Ember.Controller.extend({
  isHeaderCollapsed: true,
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('public.convention', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('public.convention', newCur);
    },
  },
  conventionSort: [
    'date',
  ],
  parentConventions: Ember.computed(function(){
    return this.store.query('convention', {year: 2016});
  }),
  sortedItems: Ember.computed.sort(
    'parentConventions',
    'conventionSort'
  ),
  sessionSortProperties: ['kind:asc',],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  )
});
