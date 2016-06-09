import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  contestantSortProperties: [
    'total_points:desc',
    'sng_points:desc',
    'mus_points:desc',
    'prs_points:desc'
  ],
  sortedContestants: Ember.computed.sort(
    'model.primary.contestants',
    'contestantSortProperties'
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
  panelSort: ['designation:asc',],
  officialJudges: Ember.computed.filterBy(
    'model.judges',
    'kind',
    'Official'
  ),
  sortedPanel: Ember.computed.sort(
    'officialJudges',
    'panelSort'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
