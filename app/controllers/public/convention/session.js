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
  }
});
