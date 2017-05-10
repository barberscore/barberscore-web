import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  actions: {
    validateRepertory() {
      this.model.validate()
      .then((response) => {
        this.store.pushPayload('repertory', response);
        this.get('flashMessages').success("Validated!");
      });
    },
    invalidateRepertory() {
      this.model.invalidate()
      .then((response) => {
        this.store.pushPayload('repertory', response);
        this.get('flashMessages').success("Invalidated!");
      });
    },
    deleteRepertory() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.chorus-manager.chorus.repertories');
      });
    }
  },
});
