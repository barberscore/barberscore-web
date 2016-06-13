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
  finishedSort: ['rank', 'performer.group.name',],
  donePerformers: Ember.computed.filterBy(
    'model.performers',
    'status',
    'Published'
  ),
  finishedPerformers: Ember.computed.sort(
    'donePerformers',
    'finishedSort'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
