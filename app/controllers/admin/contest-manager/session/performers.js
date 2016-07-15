import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
    sortPerformersBy(performerSortProperties) {
      this.set('performerSortProperties', [performerSortProperties]);
    },
    penalizeEligibility(performer) {
      performer.penalizeEligibility();
    },
  },
  isHeaderCollapsed: false,
  performerSortProperties: [
    'performer.totRank:asc',
    'group.nomen:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
});
