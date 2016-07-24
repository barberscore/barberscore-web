import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  performerSortProperties: [
    'performerscore.total_points:desc',
    'performerscore.sng_points:desc',
    'performerscore.mus_points:desc',
    'performerscore.prs_points:desc',
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
