import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  actions: {
    validateRepertory() {
      this.model.validateRepertory()
      .then((response) => {
        this.store.pushPayload('repertory', response);
        this.get('flashMessages').success("Validated!");
        this.transitionToRoute('dashboard.quartet-manager.quartet.repertories');
      });
    },
    invalidateRepertory() {
      this.model.invalidate()
      .then((response) => {
        this.store.pushPayload('repertory', response);
        this.get('flashMessages').success("Invalidated!");
        this.transitionToRoute('dashboard.quartet-manager.quartet.repertories');
      });
    },
    deleteRepertory() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.quartet-manager.quartet.repertories');
      });
    }
  },
});
