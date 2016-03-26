import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  performerSortProperties: ['total_points:desc',],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  contestSortProperties: ['name:asc',],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
