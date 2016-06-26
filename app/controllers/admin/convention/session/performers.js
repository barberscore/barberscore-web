import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sortPerformersBy(performerSortProperties) {
      this.set('performerSortProperties', [performerSortProperties]);
    },
    penalizeEligibility(performer) {
      performer.penalizeEligibility();
    },
  },
  performerSortProperties: [
    'performer.totPoints:desc',
    'group.chap_name:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
});
