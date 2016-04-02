import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  contestantSortProperties: ['total_points:desc',],
  sortedContestants: Ember.computed.sort(
    'model.contestants',
    'contestantSortProperties'
  ),
  contestSortProperties: ['name:asc',],
  sortedContests: Ember.computed.sort(
    'model.session.contests',
    'contestSortProperties'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
