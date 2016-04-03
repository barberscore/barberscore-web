import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    buildPerformer() {
      this.model.build();
    },
    scratchPerformer() {
      this.model.scratch();
    },
    disqualifyPerformer() {
      this.model.disqualify();
    },
    deleteContestant(contestant) {
      contestant.destroyRecord();
    },
  },
});
