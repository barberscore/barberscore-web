import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    deletePerformer(performer) {
      performer.destroyRecord();
    },
    deleteJudge(judge) {
      judge.destroyRecord();
    }
  },
  performerSortProperties: ['name:asc',],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
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
  contestsSorted: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  judgeSortProperties: ['kind', 'category', 'slot',],
  judgesSorted: Ember.computed.sort(
    'model.judges',
    'judgeSortProperties'
  ),
});
