import Ember from 'ember';

export default Ember.Controller.extend({
  isCurrentCollapsed: false,
  isResultsCollapsed: true,
  isRaw: false,
  performanceSortProperties: [
    'num',
  ],
  sortedPerformances: Ember.computed.sort(
    'model.current.performances',
    'performanceSortProperties'
  ),
  performerSortProperties: [
    'rank',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  actions: {
    collapseHeader() {
      this.toggleProperty('isCurrentCollapsed');
    },
    letsGo() {
      this.toggleProperty('isRaw');
    },
    sortPerformancesBy(performanceSortProperties) {
      this.set('performanceSortProperties', [performanceSortProperties]);
    },
    sortPerformersBy(performerSortProperties) {
      this.set('performerSortProperties', [performerSortProperties]);
    },
  }
});
