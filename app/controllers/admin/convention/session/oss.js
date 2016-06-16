import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  performerSortProperties: [
    'rank:asc',
    'total_points:desc',
    'sng_points:desc',
    'mus_points:desc',
    'prs_points:desc'
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  contestSortProperties: ['name:asc',],
  championshipContests: Ember.computed.filterBy(
    'model.contests',
    'is_qualifier',
    false
  ),
  sortedContests: Ember.computed.sort(
    'championshipContests',
    'contestSortProperties'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
