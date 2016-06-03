import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  contestantSortProperties: ['rank:asc', 'name:asc',],
  sortedContestants: Ember.computed.sort(
    'model.contestants',
    'contestantSortProperties'
  ),
  actions: {
    deleteContestant(contestant) {
      contestant.destroyRecord();
    },
    buildContest() {
      this.model.build();
    },
  },
});
