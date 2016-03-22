import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    addPerformance(performance) {
      performance.add_performance();
    },
    deletePerformer(performer) {
      performer.destroyRecord();
    },
    scratchJudge(judge) {
      judge.destroyRecord();
    },
    deleteJudge(judge) {
      judge.destroyRecord();
    },
    deleteContest(contest) {
      contest.destroyRecord();
    },
    drawRound(round) {
      const flashMessages = Ember.get(this, 'flashMessages');
      round.draw()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      round.reload();
      this.transitionToRoute('admin.convention.session.round', round);
    },
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
