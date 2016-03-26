import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
  judgeSortProperties: ['category',],
  sortedJudges: Ember.computed.sort(
    'model.judges',
    'judgeSortProperties'
  ),
  contestSortProperties: [
    'award.level:desc',
    'award.organization:asc',
    'award.is_primary:desc',
    'award.kind:asc',
    'award.is_improved:asc',
    'award.size:asc',
    'award.scope:asc',
  ],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  performerSortProperties: ['name',],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
});
