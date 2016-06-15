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
  qualificationContests: Ember.computed.filterBy(
    'model.contests',
    'is_qualifier',
    true
  ),
  sortedContests: Ember.computed.sort(
    'model.contests',
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
  publishedPerformers: Ember.computed.filterBy(
    'model.performers',
    'status',
    'Published'
  ),
  primaryPerformers: Ember.computed.filterBy(
    'publishedPerformers',
    'rank',
  ),
  primarySort: ['rank', 'sng_points:desc', 'mus_points:desc', 'prs_points:desc'],
  primarySorted: Ember.computed.sort(
    'primaryPerformers',
    'primarySort',
  ),
  secondaryPerformers: Ember.computed.filterBy(
    'publishedPerformers',
    'rank',
    null,
  ),
  secondarySort: ['total_points:desc', 'sng_points:desc', 'mus_points:desc', 'prs_points:desc'],
  secondarySorted: Ember.computed.sort(
    'secondaryPerformers',
    'secondarySort',
  ),
  officialJudges: Ember.computed.filterBy(
    'model.judges',
    'kind',
    'Official',
  ),
  musicOfficials: Ember.computed.filterBy(
    'officialJudges',
    'category',
    'Music',
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
