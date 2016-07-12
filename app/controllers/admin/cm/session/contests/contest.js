import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteContestant(contestant) {
      contestant.destroyRecord();
    },
    buildContest() {
      this.model.build();
    },
  },
});
